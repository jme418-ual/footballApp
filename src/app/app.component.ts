import { Component, inject } from '@angular/core';
import {
  IonApp,
  IonRouterOutlet,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem
} from '@ionic/angular/standalone';

import { Router, RouterLink } from '@angular/router';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [
    RouterLink,
    IonApp,
    IonRouterOutlet,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem
  ]
})
export class AppComponent {

  authService = inject(AuthService);

  private router = inject(Router);

  async logout() {
    await this.authService.logout();
    await this.router.navigateByUrl('/players', {
      replaceUrl: true
    });
  }
}
