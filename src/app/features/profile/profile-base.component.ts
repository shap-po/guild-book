import { Component } from '@angular/core';
import { Store } from '@ngxs/store';

import { Attribute, Profile, Skill } from '@app/core/models/profile.model';
import { CreateProfile, EditProfile } from '@app/core/state/profile.state';
import { Observable } from 'rxjs';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';

import { FormlyFormOptions, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyModule } from '@ngx-formly/core';

import schema from '@assets/schema.json';

@Component({
  selector: 'app-profile-base',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    FormlyMaterialModule,
    FormlyModule,
  ],
  templateUrl: './profile-base.component.html',
  styleUrl: './profile-base.component.scss',
})
export class ProfileBaseComponent {
  profile$: Observable<Profile> = this.store.select(
    (state) => state.profile.profile
  );
  form = new FormGroup({});

  fields: FormlyFieldConfig[] = [
    // for some reason, widgets are not being parsed correctly, so ignore the ts error
    // @ts-ignore
    this.formlyJsonschema.toFieldConfig(schema),
  ];

  constructor(
    private formlyJsonschema: FormlyJsonschema,
    private store: Store
  ) {}
}
