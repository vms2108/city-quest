import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  forwardRef,
  Input,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SimpleFormControlBaseComponent } from 'src/app/ui/control-base/simple-form-control.base-component';

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
export class SelectControlComponent<T = any> extends SimpleFormControlBaseComponent<T, T> {

  @Input()
  public label: string | null = null;

  @Input()
  public options: string[] = [];

  @ViewChild('el', { static: true })
  public el!: ElementRef;

  @ViewChild('select', { static: true })
  public select!: ElementRef;

  protected readonly validatorKey = 'cq-select-control';

  constructor(
    formBuilder: FormBuilder,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    super(formBuilder, changeDetectorRef);
  }

  public setValue(value: string): void {
    this.control.setValue(value);
  }

  public createControl(): FormControl {
    return this.formBuilder.control(null);
  }

  public createValueFromInputData(inputData: T | null): T | null {
    return inputData;
  }

  public createInputDataFromValue(value: T | null): T | null {
    if (this.el.nativeElement) {
      this.select.nativeElement.value = value;
      this.el.nativeElement.dispatchEvent(new Event('change'));
    }
    return value;
  }

}
