/**
 * Same as ObjectTypeComponent but with label wrapped in a notched outline
 */
import { Component } from '@angular/core';
import { FormlyModule, FieldType } from '@ngx-formly/core';

import { NgForOf, NgIf } from '@angular/common';
import { MatLabel } from '@angular/material/form-field';

@Component({
  selector: 'formly-field-object-group',
  standalone: true,
  imports: [NgIf, NgForOf, FormlyModule, MatLabel],
  templateUrl: './object-group.type.html',
  styleUrl: './object-group.type.scss',
})
export class ObjectGroupTypeComponent extends FieldType {}
