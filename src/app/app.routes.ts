import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'players',
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
    loadComponent: () =>
      import('./features/players/players-list/players-list.page')
        .then(m => m.PlayersListPage)
  },

  {
    path: 'players/local-search',
    loadComponent: () =>
      import('./features/players/player-local-search/player-local-search.page')
        .then(m => m.PlayerLocalSearchPage)
  },

  {
    path: 'players/search',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/players/player-search/player-search.page')
        .then(m => m.PlayerSearchPage)
  },

  {
    path: 'players/create',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/players/player-create/player-create.page')
        .then(m => m.PlayerCreatePage)
  },

  {
    path: 'players/ideal-team',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/players/ideal-team/ideal-team.page')
        .then(m => m.IdealTeamPage)
  },

  {
    path: 'news',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/news/news/news.page')
        .then(m => m.NewsPage)
  },

  {
    path: 'admin/news',
    canActivate: [adminGuard],
    loadComponent: () =>
      import('./features/admin/admin-news/admin-news.page')
        .then(m => m.AdminNewsPage)
  },

  {
    path: 'players/:id',
    loadComponent: () =>
      import('./features/players/player-detail/player-detail.page')
        .then(m => m.PlayerDetailPage)
  },

  {
    path: '**',
    redirectTo: 'players'
  },
  {
    path: 'admin-news',
    loadComponent: () => import('./features/admin/admin-news/admin-news.page').then( m => m.AdminNewsPage)
  }
];