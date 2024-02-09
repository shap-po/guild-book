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
  { path: 'view', redirectTo: 'view/', pathMatch: 'full' },
  {
    path: 'view/:id',
    loadComponent: () =>
      import('./features/profile/view/view-profile.component').then(
        (m) => m.ViewProfileComponent
      ),
  },
  {
    path: 'edit',
    loadComponent: () =>
      import('./features/profile/edit/edit-profile.component').then(
        (m) => m.EditProfileComponent
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
