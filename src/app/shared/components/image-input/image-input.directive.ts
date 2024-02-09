import {
  Directive,
  Output,
  EventEmitter,
  HostBinding,
  HostListener,
} from '@angular/core';

@Directive({
  selector: '[image-input]',
  standalone: true,
})
export class ImageInputDirective {
  @HostBinding('class.fileover') fileOver!: boolean;
  @Output() fileDropped = new EventEmitter<File>();

  @HostListener('dragover', ['$event']) onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = true;
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
  }

  @HostListener('drop', ['$event']) public ondrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.fileOver = false;
    const files = evt.dataTransfer?.files;
    if (files && files.length > 0) {
      this.fileDropped.emit(files[0]);
    }
  }
}
