import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonNote,
  IonRefresher,
  IonRefresherContent,
  IonText,
  IonTitle,
  IonToolbar,
  RefresherCustomEvent,
} from '@ionic/angular';

import { ApiService, Health, Item } from '../../core/api.service';
import { SiteStore } from '../../core/site.store';

@Component({
  selector: 'app-items',
  templateUrl: 'items.page.html',
  styleUrls: ['items.page.scss'],
  imports: [
    DatePipe,
    ReactiveFormsModule,
    IonBadge,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonMenuButton,
    IonNote,
    IonRefresher,
    IonRefresherContent,
    IonText,
    IonTitle,
    IonToolbar,
  ],
})
export class ItemsPage implements OnInit {
  private readonly api = inject(ApiService);
  private readonly store = inject(SiteStore);

  readonly health = signal<Health | null>(null);
  readonly items = signal<Item[]>([]);
  readonly error = signal<string | null>(null);
  readonly saving = signal(false);
  readonly name = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.maxLength(200)],
  });
  // [formGroup] makes Angular own the submit; a bare <form> would do a native GET and reload.
  readonly form = new FormGroup({ name: this.name });

  ngOnInit(): void {
    this.store.pageTitle.set('Items');
    this.refresh();
  }

  refresh(event?: RefresherCustomEvent): void {
    this.api.health().subscribe({
      next: (h) => this.health.set(h),
      error: () => this.health.set(null),
    });
    this.api.listItems().subscribe({
      next: (items) => {
        this.items.set(items);
        event?.target.complete();
      },
      error: (err) => {
        this.error.set(describe(err));
        event?.target.complete();
      },
    });
  }

  add(): void {
    const name = this.name.value.trim();
    if (!name || this.name.invalid) {
      this.name.markAsTouched();
      return;
    }
    this.saving.set(true);
    this.error.set(null);
    this.api.createItem(name).subscribe({
      next: (item) => {
        this.items.update((items) => [item, ...items]);
        this.name.reset();
        this.saving.set(false);
      },
      error: (err) => {
        this.error.set(describe(err));
        this.saving.set(false);
      },
    });
  }
}

function describe(err: HttpErrorResponse): string {
  const detail = err.error?.detail;
  if (Array.isArray(detail) && detail[0]?.msg) return detail[0].msg;
  return err.status ? `API error ${err.status}` : 'API unreachable';
}
