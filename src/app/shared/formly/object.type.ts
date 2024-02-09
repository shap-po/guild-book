import { Component } from '@angular/core';
import { FormlyModule, FieldType } from '@ngx-formly/core';

import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'formly-field-object',
  standalone: true,
  imports: [NgIf, NgForOf, FormlyModule],
  template: `
    <div class="mb-3">
      <legend *ngIf="props.label">{{ props.label }}</legend>
      <p *ngIf="props.description">{{ props.description }}</p>
      <div
        class="alert alert-danger"
        role="alert"
        *ngIf="showError && formControl.errors"
      >
        <formly-validation-message [field]="field"></formly-validation-message>
      </div>
      <formly-field
        *ngFor="let f of field.fieldGroup"
        [field]="f"
        [class]="'formly-' + f.key"
      ></formly-field>
    </div>
  `,
})
export class ObjectTypeComponent extends FieldType {}
