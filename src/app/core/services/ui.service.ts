import { Injectable, inject } from '@angular/core';

import {
  ToastController,
  LoadingController
} from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  private toastController = inject(ToastController);

  private loadingController = inject(LoadingController);

  async showToast(
    message: string,
    color: 'success' | 'danger' | 'warning' | 'primary' = 'primary'
  ) {
    const toast = await this.toastController.create({
      message,
      duration: 2200,
      position: 'bottom',
      color
    });

    await toast.present();
  }

  async showLoading(message: string) {
    const loading = await this.loadingController.create({
      message,
      spinner: 'crescent'
    });

    await loading.present();

    return loading;
  }
}