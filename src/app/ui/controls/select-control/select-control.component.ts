import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  forwardRef,
  Input,
  QueryList,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SimpleFormControlBaseComponent } from 'src/app/ui/control-base/simple-form-control.base-component';
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
export class SelectControlComponent<T = any> extends SimpleFormControlBaseComponent<T, T> implements AfterContentInit {

  @Input()
  public label: string | null = null;

  // Теперь options может быть массивом объектов или строк
  @Input()
  public options: any[] = [];

  // Если используются <cq-option>, они будут здесь
  @ContentChildren(OptionComponent) public optionComponents!: QueryList<OptionComponent>;

  @ViewChild('el', { static: true }) public el!: ElementRef;
  @ViewChild('select', { static: true }) public select!: ElementRef;

  protected readonly validatorKey = 'cq-select-control';

  constructor(formBuilder: FormBuilder, changeDetectorRef: ChangeDetectorRef) {
    super(formBuilder, changeDetectorRef);
  }

  public ngAfterContentInit(): void {
    // Если есть <cq-option>, используем их вместо options
    if (this.optionComponents?.length) {
      this.options = this.optionComponents.map((option) => option.value);
    }
  }

  public setValue(value: T): void {
    this.control.setValue(value);
  }

  public createControl(): FormControl {
    return this.formBuilder.control(null);
  }

  public createValueFromInputData(inputData: T | null): T | null {
    return inputData;
  }

  public createInputDataFromValue(value: T | null): T | null {
    if (this.el.nativeElement && value !== null) {
      const displayValue = this.getDisplayValue(value);
      this.select.nativeElement.value = displayValue;
      this.el.nativeElement.dispatchEvent(new Event('change'));
    }
    return value;
  }

  // Метод для получения значения для отображения
  public getDisplayValue(option: any): string {
    if (typeof option === 'string') {
      return option;
    }
    // Предполагаем, что у объекта есть поле label для отображения
    return option?.label || option?.toString() || '';
  }

  // Метод для получения значения для хранения
  public getOptionValue(option: any): any {
    if (typeof option === 'string') {
      return option;
    }
    // Предполагаем, что у объекта есть поле value для значения
    return option?.value !== undefined ? option.value : option;
  }
}
