import { Component } from '@angular/core';
import { ProfileCardComponent } from '@shared/components/profile-card/profile-card.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { ProfileBase } from '@app/core/models/profile.model';
import { KeyValuePipe, NgFor } from '@angular/common';

import profiles from '@assets/backend-data/profiles.json';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ProfileCardComponent,
    RouterModule,
    MatButtonModule,
    NgFor,
    KeyValuePipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  // get two random profiles to display on the home page
  featuredProfiles: Map<string, ProfileBase> = new Map<string, ProfileBase>();
  constructor() {
    const keys: [keyof typeof profiles] = Object.keys(profiles) as [
      keyof typeof profiles
    ];
    const randomKeys: Partial<keyof typeof profiles>[] = [];
    while (randomKeys.length < 2 && randomKeys.length < keys.length) {
      const randomIndex = Math.floor(Math.random() * keys.length);
      const randomKey = keys[randomIndex];
      if (!randomKeys.includes(randomKey)) {
        randomKeys.push(randomKey);
      }
    }
    randomKeys.forEach((key) => {
      this.featuredProfiles.set(key, profiles[key]);
    });
  }
}
