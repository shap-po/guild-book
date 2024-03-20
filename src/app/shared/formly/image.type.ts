import { NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatError } from '@angular/material/form-field';

import { FormlyModule, FieldType, FieldTypeConfig } from '@ngx-formly/core';

import { ImageInputComponent } from '@shared/components/image-input/image-input.component';

/** Custom formly field type for uploading images */
@Component({
  selector: 'formly-field-image',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ImageInputComponent,
    NgIf,
    FormlyModule,
    MatError,
  ],
  template: `
    <app-image-input
      (fileDropped)="onFileChange($event)"
      [value]="image"
      #imageInputRef
      [disabled]="props.disabled"
    ></app-image-input>
    <mat-error
      ><formly-validation-message
        [field]="field"
        *ngIf="showError && formControl.errors"
      ></formly-validation-message
    ></mat-error>
  `,
})
export class ImageTypeComponent extends FieldType<FieldTypeConfig> {
  image?: string | ArrayBuffer | null;

  @ViewChild('imageInputRef') imageInputRef!: ImageInputComponent;

  ngOnInit() {
    // subscribe to changes in the form control
    this.formControl.valueChanges.subscribe((value) => {
      this.image = value;
    });
    // set the initial value of the image
    this.image = this.formControl.value;
  }

  onFileChange(file: File) {
    if (file.type.indexOf('image') === -1) return; // ignore non-image file types

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (!result) return;
      this.image = result;
      this.formControl.setValue(result); // pass the image to the form control
    };
    reader.readAsDataURL(file);
  }
}
