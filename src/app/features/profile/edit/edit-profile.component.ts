import { Component, Input, ViewChild } from '@angular/core';

import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';

import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyModule } from '@ngx-formly/core';

import { ProfileBaseComponent } from '../profile-base.component';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    FormlyMaterialModule,
    FormlyModule,
    ProfileBaseComponent,
    NgTemplateOutlet,
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss',
})
export class EditProfileComponent {
  @ViewChild(ProfileBaseComponent) profileBaseComponent!: ProfileBaseComponent;

  save() {
    console.log(this.profileBaseComponent.form.value);
    if (this.profileBaseComponent.form.invalid) {
      console.log('Form is invalid');
      return;
    }
  }
}
