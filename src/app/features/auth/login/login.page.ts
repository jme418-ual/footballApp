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
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
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
export class LoginPage {

  private authService = inject(AuthService);
  private router = inject(Router);
  private uiService = inject(UiService);

  email = signal('');
  password = signal('');
  errorMessage = signal('');

  async login() {

    this.errorMessage.set('');

    if (!this.email() || !this.password()) {
      await this.uiService.showToast(
        'Introduce email y contraseña',
        'warning'
      );
      return;
    }

    try {

      await this.authService.login(
        this.email(),
        this.password()
      );

      await this.router.navigateByUrl('/players', {
        replaceUrl: true
      });

    } catch (error) {

      console.error(error);

      await this.uiService.showToast(
        'Credenciales incorrectas o usuario no registrado',
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