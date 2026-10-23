import { TestBed } from '@angular/core/testing';

import { Section } from '../core/api.service';
import { FALLBACK_ICON } from '../core/icons';
import { SectionsComponent } from './sections.component';

describe('SectionsComponent', () => {
  it('renders each kind of section', () => {
    const sections: Section[] = [
      { kind: 'text', heading: 'Intro', body: 'Hello', items: [] },
      { kind: 'list', items: [{ title: 'ui → api' }] },
      { kind: 'steps', items: [{ title: 'First' }, { title: 'Second' }] },
      { kind: 'cards', items: [{ title: 'Mobile', body: 'Ionic', icon: 'not-registered' }] },
    ];
    TestBed.configureTestingModule({ imports: [SectionsComponent] });
    const fixture = TestBed.createComponent(SectionsComponent);
    fixture.componentRef.setInput('sections', sections);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('h2')?.textContent).toBe('Intro');
    expect(el.querySelector('[data-kind="list"]')?.textContent).toContain('ui → api');
    expect(el.querySelectorAll('[data-kind="steps"] ion-badge')[1].textContent?.trim()).toBe('2');
    const icon = el.querySelector('ion-card ion-icon') as HTMLIonIconElement;
    expect(icon.name).toBe(FALLBACK_ICON); // unregistered names fall back, never render blank
    expect(el.querySelector('ion-card')?.textContent).toContain('Ionic');
  });
});
