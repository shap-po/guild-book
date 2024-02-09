import { Component } from '@angular/core';
import { ProfileCardComponent } from '@shared/components/profile-card/profile-card.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

import { ProfileBase } from '@app/core/models/profile.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProfileCardComponent, RouterModule, MatButtonModule, NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  featuredProfiles: ProfileBase[] = [
    {
      uuid: 'eah',
      name: 'Eah',
      _class: 'Druid',
      avatarUrl: '/assets/Eah.png',
      level: 2,
      race: 'Half-ork',
      shortDescription: 'Eah talk not much. Job done fast.',
    },
    {
      uuid: 'shadow',
      name: 'Shadow',
      _class: 'Mage',
      avatarUrl: '/assets/Shadow.png',
      level: 3,
      race: 'Tabaxi',
      shortDescription:
        'Me and my loyal familiar will do any job for you, from guarding to murder... for a fair price of course.',
    },
  ];
}
