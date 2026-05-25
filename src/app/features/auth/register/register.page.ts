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

import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UiService } from '../../../core/services/ui.service';

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
    IonButton,
    IonButtons,
    IonBackButton
  ]
})
export class RegisterPage {

  private authService = inject(AuthService);
  private router = inject(Router);
  private uiService = inject(UiService);

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
      await this.uiService.showToast('Error de autenticación. Revisa el correo y la contraseña.', 'danger');
    }
  }
}