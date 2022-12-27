import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, HostBinding, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'cq-loader-with-backdrop',
  templateUrl: './loader-with-backdrop.component.html',
  styleUrls: ['./loader-with-backdrop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderWithBackdropComponent implements AfterViewInit {

  @HostBinding('class.without-padding')
  @Input()
  public withoutPadding = false;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {
  }

  public ngAfterViewInit(): void {
    const el: ElementRef<any> = this.elRef.nativeElement.querySelector('.anim');
    this.anim(1, el);
  }

  private anim(n: number, element: ElementRef): void {
    setTimeout(() => {
      if (n === 60) {
        this.renderer.removeClass(element, 'icon-loader_59');
        this.renderer.addClass(element, 'icon-loader_0');
        // tslint:disable-next-line: no-parameter-reassignment
        n = 0;
      } else {
        this.renderer.removeClass(element, `icon-loader_${ n - 1 }`);
        this.renderer.addClass(element, `icon-loader_${ n }`);
      }
      // tslint:disable-next-line: no-parameter-reassignment
      n ++;
      this.anim(n, element);
    },         20);
  }

}
