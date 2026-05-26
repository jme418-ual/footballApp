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
  IonButton,
  IonButtons,
  IonBackButton
} from '@ionic/angular/standalone';

import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UiService } from '../../../core/services/ui.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonInput,
    IonButton,
    IonButtons,
    IonBackButton,
    RouterLink
  ]
})
export class RegisterPage {

  private authService = inject(AuthService);
  private router = inject(Router);
  private uiService = inject(UiService);

  email = signal('');
  password = signal('');

  async register() {

    if (!this.email() || !this.password()) {
      await this.uiService.showToast(
        'Introduce email y contraseña',
        'warning'
      );
      return;
    }

    if (this.password().length < 6) {
      await this.uiService.showToast(
        'La contraseña debe tener al menos 6 caracteres',
        'warning'
      );
      return;
    }

    try {

      await this.authService.register(
        this.email(),
        this.password()
      );

      await this.router.navigateByUrl('/players', {
        replaceUrl: true
      });

    } catch (error) {

      console.error(error);

      await this.uiService.showToast(
        'No se pudo crear la cuenta. Asegúrate de introducir una dirección de correo válida.',
        'danger'
      );
    }
  }

  async ionViewWillEnter() {
    if (this.authService.isLoggedIn()) {
      await this.router.navigateByUrl('/players', {
        replaceUrl: true
      });
    }
  }
}