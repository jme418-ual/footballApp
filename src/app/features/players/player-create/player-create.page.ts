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
  IonImg,
  IonButtons,
  IonBackButton
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { PlayersService } from '../../../core/services/players.service';
import { CameraService } from '../../../core/services/camera.service';
import { StorageService } from '../../../core/services/storage.service';
import { GeolocationService } from '../../../core/services/geolocation.service';
import { UiService } from '../../../core/services/ui.service';

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
    IonImg,
    IonButtons,
    IonBackButton
  ]
})
export class PlayerCreatePage {

  private playersService = inject(PlayersService);
  private cameraService = inject(CameraService);
  private storageService = inject(StorageService);
  private geolocationService = inject(GeolocationService);
  private uiService = inject(UiService);
  name = signal('');
  team = signal('');
  league = signal('');
  image = signal<string | null>(null);
  imageUrl = signal('');
  latitude = signal<number | null>(null);
  longitude = signal<number | null>(null);

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

  async loadCurrentLocation() {
    try {
      const coordinates =
        await this.geolocationService.getCurrentPosition();

      this.latitude.set(coordinates.latitude);
      this.longitude.set(coordinates.longitude);

    } catch (error) {
      console.error(error);

      await this.uiService.showToast(
        'No se pudo obtener la geolocalización',
        'warning'
      );
    }
  }

  async createPlayer() {

    const loading =
      await this.uiService.showLoading('Creando jugador...');

    try {

      const finalImage =
        this.image() || this.imageUrl() || undefined;

      await this.playersService.createPlayer({
        name: this.name(),
        team: this.team(),
        league: this.league(),
        imageUrl: finalImage,
        latitude: this.latitude() ?? undefined,
        longitude: this.longitude() ?? undefined
      });

      await this.uiService.showToast(
        'Jugador creado correctamente',
        'success'
      );

    } catch (error) {

      console.error(error);

      await this.uiService.showToast(
        'Error al crear el jugador',
        'danger'
      );

    } finally {

      await loading.dismiss();

    }
  }

  async ionViewWillEnter() {
    await this.loadCurrentLocation();
  }
}