import { ApplicationConfig, provideZoneChangeDetection, isDevMode, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideServiceWorker } from '@angular/service-worker';
import { DBConfig, NgxIndexedDBModule } from 'ngx-indexed-db';
import { provideHttpClient } from '@angular/common/http';

const dbConfig: DBConfig = {
  name: 'EcommerceDB',
  version: 1,
  objectStoresMeta: [
    {
      store: 'products',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [{ name: 'title', keypath: 'title', options: { unique: false } }]
    },
    {
      store: 'cart',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [{ name: 'quantity', keypath: 'quantity', options: { unique: false } }]
    },
    {
      store: 'orders',
      storeConfig: { keyPath: 'id', autoIncrement: true },
      storeSchema: [{ name: 'items', keypath: 'items', options: { unique: false } }]
    }
  ]
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideNoopAnimations(),
    importProvidersFrom(NgxIndexedDBModule.forRoot(dbConfig)),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ]
};
