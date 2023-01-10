import { Directive, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[cqInput]',
})

export class InputDirective implements OnInit {
  constructor(
    private readonly el: ElementRef,
    private readonly renderer: Renderer2,
    ) {
  }

  public ngOnInit(): void {
    const value = this.el.nativeElement.value;
    this.checkFill(value);
  }

  @HostListener('keyup', ['$event']) public onKeyup(event: KeyboardEvent): void {
    const value = (event.target as HTMLInputElement).value;
    this.checkFill(value);
  }

  @HostListener('blur', ['$event']) public onBlur(event: KeyboardEvent): void {
    this.renderer.addClass(this.el.nativeElement, 'focusout');
  }

  private checkFill(value: string | null): void {
    if (value) {
      this.renderer.addClass(this.el.nativeElement, 'fill');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'fill');
    }
  }

}
