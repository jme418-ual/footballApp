import { Injectable, inject, signal, computed } from '@angular/core';
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

  private adminEmails = [
    'prueba1@gmail.com'
  ];

  user = signal<User | null>(null);
  initialized = signal(false);

  isLoggedIn = computed(() => this.user() !== null);

  isAdmin = computed(() => {
    const email = this.user()?.email;
    return email ? this.adminEmails.includes(email) : false;
  });

  constructor() {
    this.auth.onAuthStateChanged(user => {
      this.user.set(user);
      this.initialized.set(true);
    });
  }

  async register(email: string, password: string) {
    return await createUserWithEmailAndPassword(this.auth, email, password);
  }

  async login(email: string, password: string) {
    return await signInWithEmailAndPassword(this.auth, email, password);
  }

  async logout() {
    await signOut(this.auth);
  }
}
