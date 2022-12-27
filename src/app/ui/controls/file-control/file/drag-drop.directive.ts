import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[sqDragDrop]',
})
export class DragDropDirective {

  private static readonly BASE_COLOR = '#f5fcff';

  private static readonly ACTIVE_COLOR = '#9ecbec';

  @Output()
  public readonly fileDropped = new EventEmitter<File>();

  @Output()
  public readonly dropError = new EventEmitter<string>();

  @HostBinding('style.background-color')
  public background = DragDropDirective.BASE_COLOR;

  @HostBinding('style.opacity')
  public opacity = 1;

  @HostListener('dragover', ['$event'])
  public dragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.background = DragDropDirective.ACTIVE_COLOR;
    this.opacity = 0.8;
  }

  @HostListener('dragleave', ['$event'])
  public dragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.background = DragDropDirective.BASE_COLOR;
    this.opacity = 1;
  }

  @HostListener('drop', ['$event'])
  public drop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();

    this.background = DragDropDirective.BASE_COLOR;
    this.opacity = 1;

    const files = event.dataTransfer!.files;
    if (files.length > 1) {
      this.dropError.emit('Нельзя добавлять более одного файла');
      return;
    }

    if (files.length > 0) {
      this.fileDropped.emit(files[0]);
    }
  }

}
