import { Directive, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { distinctUntilChanged, map, startWith, takeUntil } from 'rxjs/operators';

const THRESHOLD = 20;

@Directive({
  selector: '[cqScrolled]',
})
export class ScrolledDirective implements OnInit, OnDestroy {

  private destroy = new Subject<void>();

  constructor(
    private readonly renderer: Renderer2,
    private readonly el: ElementRef<HTMLElement>,
  ) {
  }

  public ngOnInit(): void {
    this.subscribeOnWindowScroll();
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  private subscribeOnWindowScroll(): void {
    fromEvent(window, 'scroll')
      .pipe(
        map(() => window.scrollY),
        map(data => data > THRESHOLD),
        distinctUntilChanged(),
        startWith(false),
        takeUntil(this.destroy),
      )
      .subscribe(stuck => {
        this.renderer.setAttribute(
          this.el.nativeElement,
          'scrolled',
          String(stuck),
        );
      });
  }
}
