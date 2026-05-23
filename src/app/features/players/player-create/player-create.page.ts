import {
  Component,
  inject,
  signal
} from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonInput,
  IonButton,
  IonImg
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { PlayersService } from '../../../core/services/players.service';
import { CameraService } from '../../../core/services/camera.service';
import { StorageService } from '../../../core/services/storage.service';
import { GeolocationService } from '../../../core/services/geolocation.service';

@Component({
  selector: 'app-player-create',
  templateUrl: './player-create.page.html',
  standalone: true,
  imports: [
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonInput,
    IonButton,
    IonImg
  ]
})
export class PlayerCreatePage {

  private playersService = inject(PlayersService);
  private cameraService = inject(CameraService);
  private storageService = inject(StorageService);
  private geolocationService = inject(GeolocationService);
  name = signal('');
  team = signal('');
  league = signal('');
  image = signal<string | null>(null);

  async takePicture() {

    const image =
      await this.cameraService.takePicture();

    if (image) {

      this.image.set(image);

      await this.storageService.set(
        'last-player-image',
        image
      );
    }
  }

  async createPlayer() {
    try {
      const coordinates =
        await this.geolocationService.getCurrentPosition();

      await this.playersService.createPlayer({
        name: this.name(),
        team: this.team(),
        league: this.league(),
        imageUrl: this.image() ?? undefined,
        latitude: coordinates.latitude,
        longitude: coordinates.longitude
      });

      alert('Jugador creado correctamente');

    } catch (error) {
      console.error(error);
      alert('Error al crear el jugador');
    }
  }
}