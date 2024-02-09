import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { ProfileBase } from '@app/core/models/profile.model';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {
  @Input() profile!: ProfileBase;
}
