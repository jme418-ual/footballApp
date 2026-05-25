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

  async updatePlayer(id: number, player: Player) {
    return await firstValueFrom(
      this.http.put<ApiResponse<Player>>(
        `${environment.apiUrl}/players/${id}`,
        player
      )
    );
  }

  async deletePlayer(id: number) {
    return await firstValueFrom(
      this.http.delete<ApiResponse<void>>(
        `${environment.apiUrl}/players/${id}`
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

  async searchLocalPlayers(filters: {
    name?: string;
    team?: string;
    league?: string;
    createdAt?: string;
  }) {
    const params = new URLSearchParams();

    if (filters.name) {
      params.append('name', filters.name);
    }

    if (filters.team) {
      params.append('team', filters.team);
    }

    if (filters.league) {
      params.append('league', filters.league);
    }

    if (filters.createdAt) {
      params.append('createdAt', filters.createdAt);
    }

    const response = await firstValueFrom(
      this.http.get<ApiResponse<Player[]>>(
        `${environment.apiUrl}/players/search?${params.toString()}`
      )
    );

    this.players.set(response.data);

    return response.data;
  }

  async generateIdealTeam() {
    const response = await firstValueFrom(
      this.http.get<ApiResponse<string>>(
        `${environment.apiUrl}/players/ideal-team`
      )
    );

    return response.data;
  }
}