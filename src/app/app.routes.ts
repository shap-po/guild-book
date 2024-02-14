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
      import('./features/users/users.component').then((m) => m.UsersComponent),
  },
  { path: 'profile', redirectTo: 'profile/', pathMatch: 'full' },
  {
    path: 'profile/:id',
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
