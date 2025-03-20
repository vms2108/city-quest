import { AfterContentInit, Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2 } from '@angular/core';

@Directive({
  selector: '[cqSelect]',
})
export class SelectDirective implements AfterContentInit {
  @Input() public label!: string;
  @Output() public setValue = new EventEmitter<any>(); // Теперь any, чтобы поддерживать объекты

  constructor(
    private readonly host: ElementRef<HTMLDivElement>,
    private readonly renderer: Renderer2
  ) {}

  @HostListener('change')
  public onContentScroll(): void {
    this.setSelectedElem();
  }

  public ngAfterContentInit(): void {
    const selElmnt: HTMLSelectElement = this.host.nativeElement.getElementsByTagName('select')[0];
    const a = this.renderer.createElement('DIV');
    a.setAttribute('class', 'select-selected');
    const optionCollection: HTMLOptionsCollection = selElmnt.options;
    const selectElement = <HTMLSelectElement>this.host.nativeElement.children[0];
    const selectedValue = selectElement.value
      ? this.getDisplayValue(Array.from(optionCollection).find(opt => opt.value === selectElement.value)?.value)
      : this.label;
    a.innerHTML = selectedValue || this.label;
    this.host.nativeElement.appendChild(a);

    const b = this.renderer.createElement('DIV');
    b.setAttribute('class', 'select-items select-hide');

    for (let j = 0; j < optionCollection.length; j++) {
      const c = this.renderer.createElement('DIV');
      const optionValue = optionCollection[j].value;
      c.innerHTML = this.getDisplayValue(optionValue); // Отображаем label
      c.dataset.value = JSON.stringify(optionValue); // Сохраняем полное значение

      c.addEventListener('click', () => {
        const s = <HTMLSelectElement>c.parentNode!.parentNode!.getElementsByTagName('select')[0];
        const h = <HTMLElement>c.parentNode!.previousSibling!;
        const selectedValue = JSON.parse(c.dataset.value!);
        this.setValue.emit(selectedValue); // Эмитим полный объект
        h.innerHTML = this.getDisplayValue(selectedValue);
        s.value = this.getOptionValue(selectedValue);

        const y = c.parentNode!.getElementsByClassName('same-as-selected');
        for (let k = 0; k < y.length; k++) {
          y[k].removeAttribute('class');
        }
        c.setAttribute('class', 'same-as-selected');
        h.click();
      });

      b.appendChild(c);
    }

    this.host.nativeElement.appendChild(b);

    a.addEventListener('click', (e: Event) => {
      e.stopPropagation();
      closeAllSelect(a);
      a.nextSibling!.classList.toggle('select-hide');
      a.classList.toggle('select-arrow-active');
    });
  }

  private setSelectedElem(): void {
    const a = this.renderer.createElement('DIV');
    a.setAttribute('class', 'select-selected');
    const selectElement = <HTMLSelectElement>this.host.nativeElement.children[0];
    const selectedValue = selectElement.value
      ? this.getDisplayValue(selectElement.value)
      : this.label;
    a.innerHTML = selectedValue || this.label;
    const aOld = this.host.nativeElement.getElementsByClassName('select-selected');
    if (aOld.item(0)) {
      this.host.nativeElement.replaceChild(a, aOld.item(0)!);
      a.addEventListener('click', (e: Event) => {
        e.stopPropagation();
        closeAllSelect(a);
        a.nextSibling!.classList.toggle('select-hide');
        a.classList.toggle('select-arrow-active');
      });
    }
  }

  private getDisplayValue(option: any): string {
    if (typeof option === 'string') return option;
    return option?.label || option?.toString() || '';
  }

  private getOptionValue(option: any): any {
    if (typeof option === 'string') return option;
    return option?.value !== undefined ? option.value : option;
  }
}

function closeAllSelect(elmnt: any): void {
  const x = document.getElementsByClassName('select-items');
  const y = document.getElementsByClassName('select-selected');
  const arrNo = [];
  for (let i = 0; i < y.length; i++) {
    if (elmnt === y[i]) {
      arrNo.push(i);
    } else {
      y[i].classList.remove('select-arrow-active');
    }
  }
  for (let i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i) === -1) {
      x[i].classList.add('select-hide');
    }
  }
}