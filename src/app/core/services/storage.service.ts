import { Injectable } from '@angular/core';

import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  async set(key: string, value: any) {

    await Preferences.set({
      key,
      value: JSON.stringify(value)
    });
  }

  async get<T>(key: string): Promise<T | null> {

    const result = await Preferences.get({ key });

    if (!result.value) {
      return null;
    }

    return JSON.parse(result.value) as T;
  }

  async remove(key: string) {

    await Preferences.remove({ key });
  }
}