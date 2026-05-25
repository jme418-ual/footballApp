import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonImg,
  IonButton,
  IonButtons,
  IonMenuButton
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { PlayersService } from '../../../core/services/players.service';
import { AuthService } from '../../../core/services/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-players-list',
  templateUrl: './players-list.page.html',
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
  private authService = inject(AuthService);

  players = this.playersService.players;

  async ionViewWillEnter() {
    await this.playersService.loadPlayers();
  }

  async logout() {
    await this.authService.logout();
  }
}