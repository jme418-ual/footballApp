import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

import { environment } from '../../../environments/environment';

import { Player } from '../models/player.model';
import { ApiResponse } from '../models/api-response.model';
import { ExternalPlayer } from '../models/external-player.model';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  private http = inject(HttpClient);

  players = signal<Player[]>([]);

  async loadPlayers() {

    const response = await firstValueFrom(
      this.http.get<ApiResponse<Player[]>>(
        `${environment.apiUrl}/players`
      )
    );

    this.players.set(response.data);
  }

  async createPlayer(player: Player) {

    return await firstValueFrom(
      this.http.post<ApiResponse<Player>>(
        `${environment.apiUrl}/players`,
        player
      )
    );
  }

  async searchExternalPlayers(query: string) {

    const response = await firstValueFrom(
      this.http.get<ApiResponse<ExternalPlayer[]>>(
        `${environment.apiUrl}/players/external/search?query=${query}`
      )
    );

    return response.data;
  }

  async importExternalPlayer(externalId: number) {

    return await firstValueFrom(
      this.http.post<ApiResponse<Player>>(
        `${environment.apiUrl}/players/external/import/${externalId}`,
        {}
      )
    );
  }
}