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
import { UiService } from '../../../core/services/ui.service';

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
  private uiService = inject(UiService);

  name = signal('');
  team = signal('');
  league = signal('');
  createdAt = signal('');

  results = signal<Player[]>([]);

  async search() {

    const hasFilters =
      this.name().trim() ||
      this.team().trim() ||
      this.league().trim() ||
      this.createdAt().trim();

    if (!hasFilters) {
      await this.uiService.showToast(
        'Introduce al menos un criterio de búsqueda',
        'warning'
      );
      return;
    }

    const players =
      await this.playersService.searchLocalPlayers({
        name: this.name().trim(),
        team: this.team().trim(),
        league: this.league().trim(),
        createdAt: this.createdAt()
      });

    this.results.set(players);
  }
}