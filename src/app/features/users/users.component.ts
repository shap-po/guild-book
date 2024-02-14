import { Component } from '@angular/core';
import { ProfileCardComponent } from '@shared/components/profile-card/profile-card.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { KeyValuePipe, NgFor } from '@angular/common';

import profiles from '@assets/backend-data/profiles.json';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    ProfileCardComponent,
    RouterModule,
    MatButtonModule,
    NgFor,
    KeyValuePipe,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent {
  profiles = profiles;
}
