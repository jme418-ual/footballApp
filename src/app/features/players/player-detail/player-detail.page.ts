import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  inject,
  signal
} from '@angular/core';
import {
  ActivatedRoute
} from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonTextarea,
  IonInput,
  IonButton,
  IonItem,
  IonButtons,
  IonBackButton
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlayersService } from '../../../core/services/players.service';
import { CommentsService } from '../../../core/services/comments.service';
import { GeolocationService } from '../../../core/services/geolocation.service';
import { Player } from '../../../core/models/player.model';
import { Comment } from '../../../core/models/comment.model';
import { AuthService } from '../../../core/services/auth.service';
import { UiService } from '../../../core/services/ui.service';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.page.html',
  styleUrls: ['./player-detail.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardContent,
    IonTextarea,
    IonInput,
    IonButton,
    IonItem,
    IonButtons,
    IonBackButton,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PlayerDetailPage {

  private route = inject(ActivatedRoute);
  private playersService = inject(PlayersService);
  private commentsService = inject(CommentsService);
  private geolocationService = inject(GeolocationService);
  authService = inject(AuthService);
  private uiService = inject(UiService);

  player = signal<Player | null>(null);
  comments = signal<Comment[]>([]);
  text = signal('');
  rating = signal(5);

  editing = signal(false);

  editName = signal('');
  editTeam = signal('');
  editLeague = signal('');
  editImageUrl = signal('');

  playerId = Number(
    this.route.snapshot.paramMap.get('id')
  );

  async ionViewWillEnter() {

    await this.loadPlayer();
    await this.loadComments();
  }

  async loadPlayer() {

    const players = this.playersService.players();

    const player =
      players.find(p => p.id === this.playerId) ?? null;

    this.player.set(player);

    if (player) {
      this.editName.set(player.name);
      this.editTeam.set(player.team ?? '');
      this.editLeague.set(player.league ?? '');
      this.editImageUrl.set(player.imageUrl ?? '');
    }
  }

  async updatePlayer() {
    const current = this.player();

    if (!current || !current.id) {
      return;
    }

    await this.playersService.updatePlayer(current.id, {
      ...current,
      name: this.editName(),
      team: this.editTeam(),
      league: this.editLeague(),
      imageUrl: this.editImageUrl()
    });

    this.editing.set(false);

    await this.playersService.loadPlayers();
    await this.loadPlayer();

    await this.uiService.showToast('Jugador actualizado correctamente', 'success');
  }

  async deletePlayer() {
    const current = this.player();

    if (!current || !current.id) {
      return;
    }

    const confirmed =
      confirm('¿Seguro que quieres eliminar este jugador?');

    if (!confirmed) {
      return;
    }

    await this.playersService.deletePlayer(current.id);

    await this.uiService.showToast('Jugador eliminado correctamente', 'success');

    window.history.back();
  }

  async loadComments() {

    const comments =
      await this.commentsService.getComments(
        this.playerId
      );

    this.comments.set(comments);
  }

  async createComment() {

    if (this.rating() < 0 || this.rating() > 5) {
      await this.uiService.showToast('La valoración debe estar entre 0 y 5', 'warning');
      return;
    }

    if (this.text().length > 1000) {
      await this.uiService.showToast('El comentario no puede superar los 1000 caracteres', 'warning');
      return;
    }

    try {

      let latitude: number | undefined;
      let longitude: number | undefined;

      try {

        const coordinates =
          await this.geolocationService.getCurrentPosition();

        latitude = coordinates.latitude;
        longitude = coordinates.longitude;

      } catch (geoError) {

        console.error('Error obteniendo geolocalización', geoError);
      }

      await this.commentsService.createComment({

        playerId: this.playerId,

        author: 'Usuario Firebase',

        text: this.text(),

        rating: this.rating(),

        latitude,
        longitude

      });

      this.text.set('');

      await this.loadComments();

      await this.uiService.showToast('Comentario creado correctamente', 'success');

    } catch (error) {

      console.error(error);

      await this.uiService.showToast('Error al crear el comentario', 'danger');
    }
  }

  async deleteComment(id: number | undefined) {
    if (!id) {
      return;
    }

    const confirmed =
      confirm('¿Seguro que quieres borrar este comentario?');

    if (!confirmed) {
      return;
    }

    await this.commentsService.deleteComment(id);

    await this.loadComments();

    await this.uiService.showToast('Comentario eliminado correctamente', 'success');
  }
}