// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'http://localhost:8081',
  commentsUrl: 'http://localhost:8082',
  newsUrl: 'http://localhost:8083',
  firebaseConfig: {
    apiKey: 'AIzaSyAwPCWomgYlRoxVfJGSgd-yKsYYkNCwHRk',
    authDomain: 'footballapp-jme418.firebaseapp.com',
    projectId: 'footballapp-jme418',
    storageBucket: 'footballapp-jme418.firebasestorage.app',
    messagingSenderId: '757041766541',
    appId: '1:757041766541:web:771a33f4929363599842c4'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
