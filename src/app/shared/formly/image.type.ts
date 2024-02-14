import { NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FormlyModule, FieldType, FieldTypeConfig } from '@ngx-formly/core';

import { ImageInputComponent } from '@shared/components/image-input/image-input.component';

/** Custom formly field type for uploading images */
@Component({
  selector: 'formly-field-image',
  standalone: true,
  imports: [ReactiveFormsModule, ImageInputComponent, NgIf, FormlyModule],
  template: `
    <app-image-input
      (fileDropped)="onFileChange($event)"
      [value]="image"
      #imageInputRef
    ></app-image-input>
    <div
      class="alert alert-danger"
      role="alert"
      *ngIf="showError && formControl.errors"
    >
      <formly-validation-message [field]="field"></formly-validation-message>
    </div>
  `,
  styles: `
  
  `,
})
export class ImageTypeComponent extends FieldType<FieldTypeConfig> {
  image?: string | ArrayBuffer | null;

  @ViewChild('imageInputRef') imageInputRef!: ImageInputComponent;

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

  ngOnInit() {
    // subscribe to changes in the form control
    this.formControl.valueChanges.subscribe((value) => {
      this.image = value;
    });
    // set the initial value of the image
    this.image = this.formControl.value;
  }
}
