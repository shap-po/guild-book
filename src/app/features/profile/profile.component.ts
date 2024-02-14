import { Component, ElementRef, Input } from '@angular/core';
import { Select, Store } from '@ngxs/store';

import { Profile } from '@app/core/models/profile.model';
import { EditProfile, ProfileState } from '@app/core/state/profile.state';
import { Observable } from 'rxjs';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';

import { FormlyModule, FormlyFieldConfig } from '@ngx-formly/core';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';
import { FormlyMaterialModule } from '@ngx-formly/material';

import schema from '@assets/schema.json';
import { NgIf } from '@angular/common';

// Function that adds className to all formly fields
function addFormlyConfig(schema: any) {
  function traverse(obj: any, key: string) {
    if (typeof obj === 'object') {
      // If the object has a 'type' attribute, add the formlyConfig
      if (obj.hasOwnProperty('type')) {
        obj.widget = {
          ...obj?.widget,
          formlyConfig: {
            ...obj?.widget?.formlyConfig,
            className: `formly-field-${key}`,
          },
        };
      }
      // Recursively traverse the object's properties
      for (let key in obj) {
        traverse(obj[key], key);
      }
    }
  }

  // Start traversing from the root schema
  traverse(schema, 'root');
  return schema;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    FormlyMaterialModule,
    FormlyModule,
    NgIf,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  @Input() edit = true;
  form = new FormGroup({});
  @Select(ProfileState.getProfile) profile$!: Observable<Profile>;
  model: any = {};

  fields: FormlyFieldConfig[] = [
    // for some reason, widgets are not being parsed correctly, so ignore the ts error
    // @ts-ignore
    this.formlyJsonschema.toFieldConfig(addFormlyConfig(schema)),
  ];

  constructor(
    private formlyJsonschema: FormlyJsonschema,
    private store: Store,
    private el: ElementRef
  ) {}

  ngOnInit() {
    console.log('ProfileComponent ngOnInit');
    this.profile$.subscribe((profile) => {
      console.log('ProfileComponent profile', profile);
      if (profile && this.form.value !== profile) {
        console.log('ProfileComponent setting form value', profile);
        this.model = profile;
      }
    });
  }

  save() {
    console.log(this.form.value);
    if (this.form.invalid) {
      console.log('Form is invalid');
      // scroll to the first invalid field
      const invalid = this.el.nativeElement.querySelector('.ng-invalid');
      if (invalid) {
        invalid.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    this.store.dispatch(new EditProfile(this.form.value as Profile));
  }

  fill() {
    this.model = {
      name: 'John Doe',
      race: 'Human',
      class: 'Fighter',
      avatar: 'https://via.placeholder.com/150',
      level: 1,
      shortDescription: 'A brave warrior',
    };
  }
  clear() {
    this.model = {};
  }
}
