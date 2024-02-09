import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

import { ImageInputComponent } from '@shared/components/image-input/image-input.component';

/** Custom formly field type for uploading images */
@Component({
  selector: 'formly-field-image',
  standalone: true,
  imports: [ReactiveFormsModule, ImageInputComponent],
  template: `
    <image-input (fileDropped)="onFileChange($event)"></image-input>
  `,
  styles: `
  
  `,
})
export class ImageTypeComponent extends FieldType<FieldTypeConfig> {
  image?: string | ArrayBuffer | null;

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
