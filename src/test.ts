// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { Auth } from '@angular/fire/auth';
import {
  LoadingController,
  ToastController
} from '@ionic/angular/standalone';
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(),
);

TestBed.configureTestingModule({
  providers: [
    provideHttpClient(),
    provideRouter([]),
    {
      provide: Auth,
      useValue: {
        onAuthStateChanged: () => undefined
      }
    },
    {
      provide: ToastController,
      useValue: {
        create: async () => ({
          present: async () => undefined,
          dismiss: async () => undefined
        })
      }
    },
    {
      provide: LoadingController,
      useValue: {
        create: async () => ({
          present: async () => undefined,
          dismiss: async () => undefined
        })
      }
    }
  ]
});
