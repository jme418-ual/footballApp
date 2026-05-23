import { Component, inject, signal } from '@angular/core';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonInput,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg
} from '@ionic/angular/standalone';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PlayersService } from '../../../core/services/players.service';
import { ExternalPlayer } from '../../../core/models/external-player.model';

@Component({
  selector: 'app-player-search',
  templateUrl: './player-search.page.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonInput,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonImg
  ]
})
export class PlayerSearchPage {

  private playersService = inject(PlayersService);

  query = signal('');

  results = signal<ExternalPlayer[]>([]);

  async search() {

    const players =
      await this.playersService.searchExternalPlayers(
        this.query()
      );

    this.results.set(players);
  }

  async importPlayer(externalId: number) {

    await this.playersService.importExternalPlayer(
      externalId
    );

    alert('Jugador importado correctamente');
  }
}