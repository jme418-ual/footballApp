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
  selector: 'app-register',
  templateUrl: './register.page.html',
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
export class RegisterPage {

  private authService = inject(AuthService);
  private router = inject(Router);

  email = signal('');
  password = signal('');

  async register() {
    try {

      await this.authService.register(
        this.email(),
        this.password()
      );

      await this.router.navigate(['/players']);

    } catch (error) {
      console.error(error);
      alert('Error de autenticación');
    }
  }
}