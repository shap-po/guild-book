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
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.scss',
})
export class BrowseComponent {
  profiles = profiles;
}
