import { Component, inject, signal } from '@angular/core';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCard,
  IonCardContent,
  IonButtons,
  IonMenuButton
} from '@ionic/angular/standalone';

import { PlayersService } from '../../../core/services/players.service';

@Component({
  selector: 'app-ideal-team',
  templateUrl: './ideal-team.page.html',
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonCard,
    IonCardContent,
    IonButtons,
    IonMenuButton
  ]
})
export class IdealTeamPage {

  private playersService = inject(PlayersService);

  result = signal<string | null>(null);
  loading = signal(false);

  async generate() {
    this.loading.set(true);

    try {
      const response =
        await this.playersService.generateIdealTeam();

      this.result.set(response);

    } catch (error) {
      console.error(error);
      this.result.set('Error generando el equipo ideal.');
    } finally {
      this.loading.set(false);
    }
  }
}