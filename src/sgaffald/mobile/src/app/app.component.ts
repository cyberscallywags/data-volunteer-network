import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {
  IonApp,
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
  IonRouterLink,
  IonRouterOutlet,
  IonSplitPane,
  IonTitle,
  IonToolbar,
} from '@ionic/angular';

import { iconName } from './core/icons';
import { SessionService } from './core/session.service';
import { SiteStore } from './core/site.store';
import { FEATURES, NavEntry } from './features';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    RouterLink,
    RouterLinkActive,
    IonApp,
    IonButton,
    IonContent,
    IonFooter,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonMenu,
    IonMenuToggle,
    IonNote,
    IonRouterLink,
    IonRouterOutlet,
    IonSplitPane,
    IonTitle,
    IonToolbar,
  ],
})
export class AppComponent {
  private readonly store = inject(SiteStore);
  protected readonly session = inject(SessionService);
  protected readonly iconName = iconName;

  readonly site = this.store.site;

  /** Welcome, then the manifest's project pages, then code-backed features. */
  readonly nav = computed<NavEntry[]>(() => {
    const { welcome, pages } = this.site();
    return [
      { title: welcome.title, path: '/welcome', icon: welcome.icon },
      ...pages.map((p) => ({ title: p.title, path: `/p/${p.slug}`, icon: p.icon })),
      ...FEATURES,
    ];
  });

  constructor() {
    this.store.load();
  }
}
