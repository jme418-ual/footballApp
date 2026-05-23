import {
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
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonTextarea,
  IonInput,
  IonButton,
  IonItem
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PlayersService } from '../../../core/services/players.service';
import { CommentsService } from '../../../core/services/comments.service';
import { GeolocationService } from '../../../core/services/geolocation.service';
import { Player } from '../../../core/models/player.model';
import { Comment } from '../../../core/models/comment.model';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.page.html',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonTextarea,
    IonInput,
    IonButton,
    IonItem
  ]
})
export class PlayerDetailPage {

  private route = inject(ActivatedRoute);
  private playersService = inject(PlayersService);
  private commentsService = inject(CommentsService);
  private geolocationService = inject(GeolocationService);

  player = signal<Player | null>(null);
  comments = signal<Comment[]>([]);
  text = signal('');
  rating = signal(5);

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
  }

  async loadComments() {

    const comments =
      await this.commentsService.getComments(
        this.playerId
      );

    this.comments.set(comments);
  }

  async createComment() {

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

      alert('Comentario creado correctamente');

    } catch (error) {

      console.error(error);

      alert('Error creando comentario');
    }
  }
}