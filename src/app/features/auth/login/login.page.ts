import { Component, inject, signal } from '@angular/core';
import {
  FormsModule
} from '@angular/forms';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonInput,
  IonButton
} from '@ionic/angular/standalone';

import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  standalone: true,
  imports: [
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonInput,
    IonButton
  ]
})
export class LoginPage {

  private authService = inject(AuthService);
  private router = inject(Router);

  email = signal('');
  password = signal('');

  async login() {
    try {

      await this.authService.login(
        this.email(),
        this.password()
      );

      await this.router.navigateByUrl('/players');

    } catch (error) {
      console.error(error);
      alert('Error de autenticación');
    }
  }
}