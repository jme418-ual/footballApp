import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonMenuButton
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { PlayersService } from '../../../core/services/players.service';
import { AuthService } from '../../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.page.html',
  styleUrls: ['./players-list.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    RouterLink,
    IonButtons,
    IonMenuButton
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlayersListPage {

  private playersService = inject(PlayersService);
  authService = inject(AuthService);
  private router = inject(Router);

  players = this.playersService.players;

  async ionViewWillEnter() {
    await this.playersService.loadPlayers();
  }

  async logout() {
    await this.authService.logout();
    await this.router.navigateByUrl('/players', {
      replaceUrl: true
    });
  }
}