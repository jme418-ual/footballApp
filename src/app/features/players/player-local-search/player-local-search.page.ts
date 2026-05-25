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
  IonButtons,
  IonMenuButton
} from '@ionic/angular/standalone';

import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

import { PlayersService } from '../../../core/services/players.service';
import { Player } from '../../../core/models/player.model';

@Component({
  selector: 'app-player-local-search',
  templateUrl: './player-local-search.page.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
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
  IonButtons,
  IonMenuButton
  ]
})
export class PlayerLocalSearchPage {

  private playersService = inject(PlayersService);

  name = signal('');
  team = signal('');
  league = signal('');
  createdAt = signal('');

  results = signal<Player[]>([]);

  async search() {
    const players =
      await this.playersService.searchLocalPlayers({
        name: this.name(),
        team: this.team(),
        league: this.league(),
        createdAt: this.createdAt()
      });

    this.results.set(players);
  }
}