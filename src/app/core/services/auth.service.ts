import { Injectable, inject, signal } from '@angular/core';

import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  User
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth = inject(Auth);

  user = signal<User | null>(null);

  initialized = signal(false);

  constructor() {

    this.auth.onAuthStateChanged(user => {

      this.user.set(user);

      this.initialized.set(true);
    });
  }

  async register(email: string, password: string) {

    return await createUserWithEmailAndPassword(
      this.auth,
      email,
      password
    );
  }

  async login(email: string, password: string) {

    return await signInWithEmailAndPassword(
      this.auth,
      email,
      password
    );
  }

  async logout() {

    await signOut(this.auth);
  }

  isAuthenticated(): boolean {

    return this.user() !== null;
  }
}