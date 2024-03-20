import { Component, ElementRef } from '@angular/core';
import { Select, Store } from '@ngxs/store';

import { Profile } from '@app/core/models/profile.model';
import {
  DeleteProfile,
  EditProfile,
  ProfileState,
} from '@app/core/state/profile.state';

import { Observable } from 'rxjs';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyMaterialModule } from '@ngx-formly/material';
import { FormlyJsonschema } from '@ngx-formly/core/json-schema';

import { MatButtonModule } from '@angular/material/button';

import {
  FormlyModule,
  FormlyFieldConfig,
  FormlyFormOptions,
} from '@ngx-formly/core';

import schema from '@assets/schema.json';
import { NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

import { applyFormlyConfig } from './utils';

import profiles from '@assets/backend-data/profiles.json';

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
  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {
    formState: {
      disabled: false,
    },
  };

  @Select(ProfileState.getProfile) profile$!: Observable<Profile>;

  // If the app is in development mode, show additional formly fields for debugging
  dev: boolean = false;

  fields: FormlyFieldConfig[] = [
    // for some reason, widgets are not being parsed correctly, so ignore the ts error
    // @ts-ignore
    this.formlyJsonschema.toFieldConfig(applyFormlyConfig(schema)),
  ];

  constructor(
    private formlyJsonschema: FormlyJsonschema,
    private store: Store,
    private el: ElementRef,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // load dev mode from the query params
    this.route.queryParams.subscribe((params) => {
      this.dev = params['dev'] === 'true';
    });

    // load id from the route params
    const uuid = this.route.snapshot.paramMap.get('uuid');
    if (uuid) {
      // disable the form if we are viewing a profile
      this.options.formState.disabled = true;

      // get the profile from the route
      const profile = profiles.hasOwnProperty(uuid)
        ? (profiles as any)[uuid]
        : null;

      if (!profile) {
        // redirect to the page not found page
        this.router.navigate(['/404']);
      }
      this.model = profile;

      // don't subscribe to the profile state if we already got the profile from the route
      return;
    }

    // subscribe to the profile state and update the form when it changes
    this.profile$.subscribe((profile) => {
      // only update the form if the profile exists and is different from the current form value
      if (profile && this.form.value !== profile) {
        this.model = profile;
      }
    });
  }

  save() {
    if (this.form.invalid) {
      // scroll to the first invalid field
      const invalid = this.el.nativeElement.querySelector('.ng-invalid');
      if (invalid) {
        invalid.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    this.store.dispatch(new EditProfile(this.form.value as Profile));
  }

  // developer functions
  fill() {
    this.model = {
      name: 'John Doe',
      race: 'Human',
      class: 'Fighter',
      avatar: 'assets/backend-data/someone.png',
      level: 1,
      shortDescription: 'A brave warrior',
    };
  }
  clear() {
    this.model = {};
    this.store.dispatch(new DeleteProfile());
  }
}
