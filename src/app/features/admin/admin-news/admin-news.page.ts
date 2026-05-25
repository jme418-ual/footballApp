import { Component, inject, signal } from '@angular/core';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonInput,
  IonTextarea,
  IonButton,
  IonButtons,
  IonBackButton
} from '@ionic/angular/standalone';

import { NewsService } from '../../../core/services/news.service';
import { UiService } from '../../../core/services/ui.service';

@Component({
  selector: 'app-admin-news',
  templateUrl: './admin-news.page.html',
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonInput,
    IonTextarea,
    IonButton,
    IonButtons,
    IonBackButton
  ]
})
export class AdminNewsPage {

  private newsService = inject(NewsService);
  private uiService = inject(UiService);

  fecha = signal('');
  nivelInteres = signal('');
  descripcionCorta = signal('');
  descripcionLarga = signal('');
  etiquetas = signal('');

  async createNews() {
    try {
      await this.newsService.createNews({
        fecha: this.fecha(),
        nivelInteres: this.nivelInteres(),
        descripcionCorta: this.descripcionCorta(),
        descripcionLarga: this.descripcionLarga(),
        etiquetas: this.etiquetas()
      });

      this.fecha.set('');
      this.nivelInteres.set('');
      this.descripcionCorta.set('');
      this.descripcionLarga.set('');
      this.etiquetas.set('');

      await this.uiService.showToast(
        'Noticia creada correctamente',
        'success'
      );

    } catch (error) {
      console.error(error);

      await this.uiService.showToast(
        'Error creando noticia',
        'danger'
      );
    }
  }
}