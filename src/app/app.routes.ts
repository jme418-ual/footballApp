import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.page')
        .then(m => m.LoginPage)
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register.page')
        .then(m => m.RegisterPage)
  },

  {
    path: 'players',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/players/players-list/players-list.page')
        .then(m => m.PlayersListPage)
  },
  {
    path: 'players/create',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/players/player-create/player-create.page')
        .then(m => m.PlayerCreatePage)
  },
  {
    path: 'players/search',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/players/player-search/player-search.page')
        .then(m => m.PlayerSearchPage)
  },
  {
    path: 'players/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/players/player-detail/player-detail.page')
        .then(m => m.PlayerDetailPage)
  },
  {
    path: 'news',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/news/news/news.page')
        .then(m => m.NewsPage)
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];