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
  IonTextarea,
  IonButton,
  IonCard,
  IonCardContent
} from '@ionic/angular/standalone';

import { FormsModule } from '@angular/forms';

import { NewsService } from '../../../core/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  standalone: true,
  imports: [
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonInput,
    IonTextarea,
    IonButton,
    IonCard,
    IonCardContent
  ]
})
export class NewsPage {

  private newsService = inject(NewsService);

  fecha = signal('');
  nivelInteres = signal('');
  descripcionCorta = signal('');
  descripcionLarga = signal('');
  etiquetas = signal('');
  currentNews = signal<string | null>(null);

  async createNews() {

    try {

      await this.newsService.createNews({

        fecha: this.fecha(),
        nivelInteres: this.nivelInteres(),
        descripcionCorta: this.descripcionCorta(),
        descripcionLarga: this.descripcionLarga(),
        etiquetas: this.etiquetas()

      });

      alert('Noticia enviada a CORBA');

    } catch (error) {

      console.error(error);

      alert('Error creando noticia');
    }
  }

  async readNews() {

    try {

      const response =
        await this.newsService.readNews();

      this.currentNews.set(response.data);

    } catch (error) {

      console.error(error);
    }
  }

  async consumeNews() {

    try {

      const response =
        await this.newsService.consumeNews();

      this.currentNews.set(response.data);

    } catch (error) {

      console.error(error);
    }
  }
}