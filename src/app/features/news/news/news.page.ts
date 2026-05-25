import { Component, inject, signal } from '@angular/core';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonCard,
  IonCardContent,
  IonButtons,
  IonMenuButton
} from '@ionic/angular/standalone';

import { NewsService } from '../../../core/services/news.service';
import { UiService } from '../../../core/services/ui.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.page.html',
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonCard,
    IonCardContent,
    IonButtons,
    IonMenuButton
  ]
})
export class NewsPage {

  private newsService = inject(NewsService);
  private uiService = inject(UiService);

  currentNews = signal<string | null>(null);

  async readNews() {
    try {
      const response = await this.newsService.readNews();
      this.currentNews.set(response.data);
    } catch (error) {
      console.error(error);
      await this.uiService.showToast('Error leyendo noticia', 'danger');
    }
  }

  async consumeNews() {
    try {
      const response = await this.newsService.consumeNews();
      this.currentNews.set(response.data);
    } catch (error) {
      console.error(error);
      await this.uiService.showToast('Error consumiendo noticia', 'danger');
    }
  }
}