import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonList,
  IonMenuButton,
  IonNote,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';

import { SessionService } from '../../core/session.service';
import { SiteStore } from '../../core/site.store';

@Component({
  selector: 'app-sign-in',
  templateUrl: 'sign-in.page.html',
  imports: [
    ReactiveFormsModule,
    IonButton,
    IonButtons,
    IonContent,
    IonHeader,
    IonInput,
    IonItem,
    IonList,
    IonMenuButton,
    IonNote,
    IonTitle,
    IonToolbar,
  ],
})
export class SignInPage {
  private readonly router = inject(Router);
  protected readonly session = inject(SessionService);
  protected readonly brand = inject(SiteStore).site;

  readonly form = new FormGroup({
    name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    email: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
  });

  constructor() {
    inject(SiteStore).pageTitle.set('Sign in');
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { name, email } = this.form.getRawValue();
    this.session.signIn({ name: name.trim(), email: email.trim() });
    this.form.reset();
    this.router.navigateByUrl('/welcome');
  }
}
