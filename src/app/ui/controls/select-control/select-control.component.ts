import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  EmbeddedViewRef,
  forwardRef,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  QueryList,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { FormBuilder, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import popperJs from 'popper.js';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';

import { SimpleFormControlBaseComponent } from '../../control-base/simple-form-control.base-component';

import { OptionComponent } from './option/option.component';

@Component({
  selector: 'cq-select-control',
  templateUrl: './select-control.component.html',
  styleUrls: ['./select-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SelectControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectControlComponent<T = any> extends SimpleFormControlBaseComponent<T, T>
  implements OnInit, OnDestroy {

  @Input()
  public placeholder: string | null = null;

  @Input()
  public model!: string;

  @Input()
  public options: string[] = [];

  @Input()
  public idKey: any = 'id';

  @Input()
  public labelKey: any = 'label';

  @ContentChildren(OptionComponent)
  public optionsList!: QueryList<OptionComponent>;

  public originalOptions: string[] = [];

  public searchControl = new FormControl();

  public visibleOptions = 4;

  protected readonly validatorKey = 'cq-select-control';

  private view!: EmbeddedViewRef<any>;

  private popperRef!: popperJs;

  private destroy = new Subject<void>();

  constructor(
    formBuilder: FormBuilder,
    changeDetectorRef: ChangeDetectorRef,
    private vcr: ViewContainerRef,
    private zone: NgZone,
  ) {
    super(formBuilder, changeDetectorRef);
  }

  public get isOpen(): boolean {
    return !!this.popperRef;
  }

  public get label(): string {
    console.log(this.model);
    return this.model ? this.model : 'Select...';
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.originalOptions = [...this.options];
    if (this.model !== undefined) {
      this.model = this.options.find(item => item === this.model) || '';
    }

    this.searchControl.valueChanges
      .pipe(
        debounceTime(100),
        takeUntil(this.destroy),
      )
      .subscribe(term => this.search(term));
  }

  public select(option: string): void {
    this.model = option;
    console.log(this.model);
    this.control.setValue(option);
    this.changeDetectorRef.detectChanges();
  }

  public createControl(): FormControl {
    return this.formBuilder.control(null);
  }

  public createValueFromInputData(inputData: T | null): T | null {
    return inputData;
  }

  public createInputDataFromValue(value: T | null): T | null {
    return value;
  }

  public isActive(option: any): boolean {
    if (!this.model) {
      return false;
    }

    return option[this.idKey] === this.model[this.idKey];
  }

  public open(dropdownTpl: TemplateRef<any>, origin: HTMLElement): void {
    this.view = this.vcr.createEmbeddedView(dropdownTpl);
    const dropdown = this.view.rootNodes[0];

    document.body.appendChild(dropdown);
    dropdown.style.width = `${origin.offsetWidth}px`;

    this.zone.runOutsideAngular(() => {
      this.popperRef = new popperJs(origin, dropdown, {
        removeOnDestroy: true,
      });
    });

    this.changeDetectorRef.markForCheck();
    this.handleClickOutside();
  }

  public close(): void {
    this.view.destroy();
    this.searchControl.patchValue('');
  }

  private search(value: string): void {
    this.options = this.originalOptions.filter(item => item.indexOf(this.searchControl.value) !== -1);
  }

  private handleClickOutside(): void {
    fromEvent(document, 'click')
      .pipe(
        filter(({ target }) => {
          const origin = this.popperRef.reference as HTMLElement;
          return origin.contains(target as HTMLElement) === false;
        }),
        takeUntil(this.destroy),
      )
      .subscribe(() => {
        this.close();
        this.changeDetectorRef.detectChanges();
      });
  }

}
