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
  IonImg,
  IonButtons,
  IonBackButton
} from '@ionic/angular/standalone';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PlayersService } from '../../../core/services/players.service';
import { ExternalPlayer } from '../../../core/models/external-player.model';
import { UiService } from '../../../core/services/ui.service';

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
    IonImg,
    IonButtons,
    IonBackButton
  ]
})
export class PlayerSearchPage {

  private playersService = inject(PlayersService);
  private uiService = inject(UiService);

  query = signal('');

  results = signal<ExternalPlayer[]>([]);

  async search() {

    if (!this.query().trim()) {
      await this.uiService.showToast(
        'Introduce el nombre de un jugador',
        'warning'
      );
      return;
    }

    const players =
      await this.playersService.searchExternalPlayers(
        this.query().trim()
      );

    this.results.set(players);
  }

  async importPlayer(externalId: number) {

    await this.playersService.importExternalPlayer(
      externalId
    );

    await this.uiService.showToast('Jugador importado correctamente', 'success');
  }
}