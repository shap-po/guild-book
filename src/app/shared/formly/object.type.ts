import { Component } from '@angular/core';
import { FormlyModule, FieldType } from '@ngx-formly/core';

import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'formly-field-object',
  standalone: true,
  imports: [NgIf, NgForOf, FormlyModule],
  template: `
    <div class="fields">
      <formly-field
        *ngFor="let f of field.fieldGroup"
        [field]="f"
      ></formly-field>
    </div>
  `,
})
export class ObjectTypeComponent extends FieldType {}
