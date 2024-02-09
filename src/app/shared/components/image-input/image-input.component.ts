import { Component, EventEmitter, Output } from '@angular/core';
import { NgIf } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ImageInputDirective } from './image-input.directive';

@Component({
  selector: 'image-input',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, NgIf, ImageInputDirective],
  template: `
    <div
      class="image-input"
      image-input
      (fileDropped)="onFileDrop($event)"
      [class.has-image]="!!image"
      (click)="fileInputRef.click()"
    >
      <input
        type="file"
        (change)="onFileInput($event)"
        #fileInputRef
        hidden
        accept="image/png, image/jpeg"
      />

      <ng-container *ngIf="!image; else imageRef">
        <button mat-raised-button color="primary">
          <mat-icon>add_photo_alternate</mat-icon>
          Select Image
        </button>
        <span> or drop it here</span>
        <span *ngIf="error" class="error">{{ error }}</span>
      </ng-container>

      <ng-template #imageRef>
        <img [src]="image" alt="image" />
      </ng-template>

      <div class="overlay"></div>
    </div>
  `,
  styleUrl: './image-input.component.scss',
})
export class ImageInputComponent {
  image?: string | ArrayBuffer | null;
  error?: string;

  @Output() fileDropped = new EventEmitter<File>();

  onFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    if (!target.files) return;
    const file = target.files[0];
    this.onFileDrop(file);
  }

  onFileDrop(file: File) {
    if (!file) return;
    if (file.type.indexOf('image') === -1) {
      this.error = 'Only images are allowed';
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (!result) return;
      this.image = result;
      this.fileDropped.emit(file);
    };
    reader.readAsDataURL(file);
  }
}
