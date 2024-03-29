import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';

import { FormlyModule } from '@ngx-formly/core';
import { ObjectTypeComponent } from '@shared/formly/object.type';
import { ImageTypeComponent } from '@app/shared/formly/image.type';
import { ProfileState } from './core/state/profile.state';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { ObjectGroupTypeComponent } from './shared/formly/object-group/object-group.type';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(NgxsModule.forRoot([ProfileState])),
    importProvidersFrom(NgxsStoragePluginModule.forRoot()),
    importProvidersFrom(
      FormlyModule.forRoot({
        validationMessages: [
          { name: 'required', message: 'This field is required' },
        ],
        types: [
          { name: 'object', component: ObjectTypeComponent },
          { name: 'object-group', component: ObjectGroupTypeComponent },
          { name: 'image', component: ImageTypeComponent },
        ],
      })
    ),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
        floatLabel: 'always',
      },
    },
  ],
};
