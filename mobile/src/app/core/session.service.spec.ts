import { TestBed } from '@angular/core/testing';

import meta from './meta.json';
import { SessionService } from './session.service';

describe('SessionService', () => {
  beforeEach(() => localStorage.clear());

  it('remembers the member across app restarts until sign-out', () => {
    TestBed.inject(SessionService).signIn({ name: 'Ada', email: 'ada@example.com' });
    TestBed.resetTestingModule();
    const session = TestBed.inject(SessionService);
    expect(session.member()?.name).toBe('Ada');
    session.signOut();
    expect(session.member()).toBeNull();
    expect(localStorage.getItem(`${meta.slug}.member`)).toBeNull();
  });
});
