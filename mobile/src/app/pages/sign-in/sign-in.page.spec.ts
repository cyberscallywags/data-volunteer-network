import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';

import { SessionService } from '../../core/session.service';
import { ApiService } from '../../core/api.service';
import { SignInPage } from './sign-in.page';

function setup() {
  TestBed.configureTestingModule({
    imports: [SignInPage],
    providers: [provideRouter([]), { provide: ApiService, useValue: {} }],
  });
  const fixture = TestBed.createComponent(SignInPage);
  fixture.detectChanges();
  const navigate = vi.spyOn(TestBed.inject(Router), 'navigateByUrl').mockResolvedValue(true);
  return { page: fixture.componentInstance, session: TestBed.inject(SessionService), navigate };
}

describe('SignInPage', () => {
  beforeEach(() => localStorage.clear());

  it('signs in with a name and valid email, then goes to welcome', () => {
    const { page, session, navigate } = setup();
    page.form.setValue({ name: ' Ada ', email: 'ada@example.com' });
    page.submit();
    expect(session.member()).toEqual({ name: 'Ada', email: 'ada@example.com' });
    expect(navigate).toHaveBeenCalledWith('/welcome');
  });

  it('rejects an invalid email', () => {
    const { page, session } = setup();
    page.form.setValue({ name: 'Ada', email: 'not-an-email' });
    page.submit();
    expect(session.member()).toBeNull();
    expect(page.form.touched).toBe(true);
  });
});
