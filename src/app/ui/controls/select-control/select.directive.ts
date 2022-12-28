import { AfterContentInit, Directive, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[cqSelect]',
})
export class SelectDirective implements AfterContentInit {

  @Input()
  public label!: string;

  @Output()
  public setValue = new EventEmitter<string>();

  constructor(
    private readonly host: ElementRef<HTMLSelectElement>,
    private readonly renderer: Renderer2,
  ) {}

  public ngAfterContentInit(): void {
    const selElmnt: HTMLSelectElement = this.host.nativeElement.getElementsByTagName('select')[0];
    const a = this.renderer.createElement('DIV');
    a.setAttribute('class', 'select-selected');
    const optionCollection: HTMLOptionsCollection  = selElmnt.options;
    a.innerHTML = this.label;

    this.host.nativeElement.appendChild(a);

    const b = this.renderer.createElement('DIV');
    b.setAttribute('class', 'select-items select-hide');

    for (let j = 0; j < optionCollection.length; j++) {
      const c = this.renderer.createElement('DIV');
      c.innerHTML = selElmnt.options[j].innerHTML;
      c.addEventListener('click', () => {
        const s = c.parentNode.parentNode.getElementsByTagName('select')[0];
        const sl = s.length;
        const h = c.parentNode.previousSibling;
        this.setValue.emit(selElmnt.options[j].innerHTML);
        for (let i = 0; i < sl; i++) {
          if (s.options[i].innerHTML === c.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = c.innerHTML;
            const y = c.parentNode.getElementsByClassName('same-as-selected');
            const yl = y.length;
            for (let k = 0; k < yl; k++) {
              y[k].removeAttribute('class');
            }
            c.setAttribute('class', 'same-as-selected');
            break;
          }
        }
        h.click();
      });

      b.appendChild(c);
    }

    this.host.nativeElement.appendChild(b);

    a.addEventListener('click', (e: Event) => {
      e.stopPropagation();
      closeAllSelect(a);
      a.nextSibling.classList.toggle('select-hide');
      a.classList.toggle('select-arrow-active');
    });
  }
}

function closeAllSelect(elmnt: any): void {
  const x = document.getElementsByClassName('select-items');
  const y = document.getElementsByClassName('select-selected');
  const xl = x.length;
  const yl = y.length;
  const arrNo = [];
  for (let i = 0; i < yl; i++) {
    if (elmnt === y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove('select-arrow-active');
    }
  }
  for (let i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add('select-hide');
    }
  }
}
