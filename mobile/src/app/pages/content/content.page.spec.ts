import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ApiService } from '../../core/api.service';
import { SiteStore } from '../../core/site.store';
import { SITE } from '../../testing/site.fixture';
import { ContentPage } from './content.page';

function render(slug: string): HTMLElement {
  TestBed.configureTestingModule({
    imports: [ContentPage],
    providers: [{ provide: ApiService, useValue: { site: () => of(SITE) } }],
  });
  TestBed.inject(SiteStore).load();
  const fixture = TestBed.createComponent(ContentPage);
  fixture.componentRef.setInput('slug', slug);
  fixture.detectChanges();
  return fixture.nativeElement;
}

describe('ContentPage', () => {
  beforeEach(() => localStorage.clear());

  it('shows the brand hero and planning steps on welcome', () => {
    const el = render('welcome');
    expect(el.querySelector('.hero h1')?.textContent).toBe(SITE.brand.name);
    expect(el.textContent).toContain('Plan it, ship it');
    expect(el.textContent).toContain('Name the domain');
    expect(el.querySelector('.hero img.emblem')?.getAttribute('src')).toContain('brand-emblem');
  });

  it('credits the partner collective on welcome and About', () => {
    for (const slug of ['welcome', 'about']) {
      const credit = render(slug).querySelector('[data-testid="partner-credit"]');
      TestBed.resetTestingModule();
      expect(credit?.textContent).toContain(`In partnership with ${SITE.brand.collective}`);
      expect(credit?.querySelector('img')?.getAttribute('src')).toContain('csw-mark-64');
    }
  });

  it('renders the About page for the collective', () => {
    expect(render('about').textContent).toContain(SITE.about.title);
  });

  it('renders a sidebar page by slug', () => {
    expect(render('roadmap').querySelector('[data-testid="page-roadmap"]')).toBeTruthy();
  });

  it('says so when the slug is not in the manifest', () => {
    expect(render('nope').textContent).toContain('not in the site manifest');
  });
});
