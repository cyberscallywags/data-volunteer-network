import { TestBed } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';
import { of, throwError } from 'rxjs';

import { SITE } from '../testing/site.fixture';
import { ApiService } from './api.service';
import { FALLBACK_SITE } from './site.fallback';
import { SiteStore } from './site.store';

function setup(site = vi.fn(() => of(SITE))): SiteStore {
  TestBed.configureTestingModule({ providers: [{ provide: ApiService, useValue: { site } }] });
  return TestBed.inject(SiteStore);
}

describe('SiteStore', () => {
  beforeEach(() => localStorage.clear());

  it('starts from the fallback, then loads the manifest from the API', () => {
    const store = setup();
    expect(store.site()).toEqual(FALLBACK_SITE);
    store.load();
    expect(store.site().brand.tagline).toBe('Plan it, ship it');
  });

  it('caches the manifest so the next launch opens offline', () => {
    setup().load();
    TestBed.resetTestingModule();
    const offline = setup(vi.fn(() => throwError(() => new Error('offline'))));
    offline.load();
    expect(offline.site().pages.map((p) => p.slug)).toEqual(['roadmap']);
  });

  it('looks pages up by slug, including welcome and about', () => {
    const store = setup();
    store.load();
    expect(store.page('welcome')?.title).toBe('Welcome');
    expect(store.page('about')?.title).toBe('About Cyber Scallywags');
    expect(store.page('roadmap')?.title).toBe('Roadmap');
    expect(store.page('missing')).toBeUndefined();
  });

  it('applies the theme and brand title to the document', () => {
    const store = setup();
    store.load();
    TestBed.tick();
    const root = document.documentElement;
    expect(root.style.getPropertyValue('--ion-color-primary')).toBe(SITE.theme.primary);
    expect(TestBed.inject(Title).getTitle()).toBe('Sgaffald');
  });
});
