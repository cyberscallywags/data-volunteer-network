import { Injectable, signal } from '@angular/core';

import meta from './meta.json';

export interface Member {
  name: string;
  email: string;
}

const KEY = `${meta.slug}.member`;

/**
 * Sign-on placeholder: remembers who is using this device so the menu can greet them.
 * It is NOT authentication; the API does not check it. Replace signIn/signOut with your
 * identity provider (OIDC, Capacitor auth plugin, ...) and send its token from ApiService.
 */
@Injectable({ providedIn: 'root' })
export class SessionService {
  readonly member = signal<Member | null>(read());

  signIn(member: Member): void {
    this.member.set(member);
    try {
      localStorage.setItem(KEY, JSON.stringify(member));
    } catch {
      // not persisted; the session lasts until reload
    }
  }

  signOut(): void {
    this.member.set(null);
    try {
      localStorage.removeItem(KEY);
    } catch {
      // nothing stored
    }
  }
}

function read(): Member | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Member) : null;
  } catch {
    return null;
  }
}
