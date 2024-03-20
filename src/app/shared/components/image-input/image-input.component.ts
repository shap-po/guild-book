import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ImageInputDirective } from './image-input.directive';

@Component({
  selector: 'app-image-input',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, NgIf, ImageInputDirective],
  templateUrl: './image-input.component.html',
  styleUrl: './image-input.component.scss',
})
export class ImageInputComponent {
  @Input() value?: string | ArrayBuffer | null;
  @Input() disabled?: boolean = false;

  @Output() fileDropped = new EventEmitter<File>();

  onFileInput(event: Event) {
    const target = event.target as HTMLInputElement;
    if (!target.files) return;
    const file = target.files[0];
    this.onFileDrop(file);
  }

  onFileDrop(file: File) {
    if (!file) return;
    if (file.type.indexOf('image') === -1) return; // Only accept images; can only happen if user changes the accept attribute

    // Read the file and emit the result
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (!result) return;
      this.value = result;
      this.fileDropped.emit(file);
    };
    reader.readAsDataURL(file);
  }
}
