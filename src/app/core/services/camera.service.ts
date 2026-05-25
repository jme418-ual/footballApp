import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';

import {
  Camera,
  CameraResultType,
  CameraSource
} from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  async takePicture(): Promise<string | undefined> {

    const source = Capacitor.getPlatform() === 'web'
      ? CameraSource.Photos
      : CameraSource.Camera;

    const image = await Camera.getPhoto({
      quality: 80,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source
    });

    return image.dataUrl;
  }
}