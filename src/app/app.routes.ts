import { Routes } from '@angular/router';

import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'browse',
    loadComponent: () =>
      import('./features/browse/browse.component').then(
        (m) => m.BrowseComponent
      ),
  },
  { path: 'profile', redirectTo: 'profile/', pathMatch: 'full' },
  {
    path: 'profile/:uuid',
    loadComponent: () =>
      import('./features/profile/profile.component').then(
        (m) => m.ProfileComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/page-not-found/page-not-found.component').then(
        (m) => m.PageNotFoundComponent
      ),
  },
];
