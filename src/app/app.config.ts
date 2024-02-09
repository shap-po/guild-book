import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';

import { FormlyModule } from '@ngx-formly/core';
import { ObjectTypeComponent } from '@shared/formly/object.type';
import { ImageTypeComponent } from '@app/shared/formly/image.type';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    importProvidersFrom(NgxsModule.forRoot()),
    importProvidersFrom(
      FormlyModule.forRoot({
        validationMessages: [
          { name: 'required', message: 'This field is required' },
        ],
        types: [
          { name: 'object', component: ObjectTypeComponent },
          { name: 'image', component: ImageTypeComponent },
        ],
      })
    ),
  ],
};
