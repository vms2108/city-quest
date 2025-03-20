import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { SimpleFormControlBaseComponent } from 'src/app/ui/control-base/simple-form-control.base-component';

@Component({
  selector: 'cq-text-control',
  templateUrl: './text-control.component.html',
  styleUrls: ['./text-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => TextControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextControlComponent extends SimpleFormControlBaseComponent<string, string> implements OnInit {

  @Input()
  public label = '';

  @Input()
  public maxLength = 64;

  public id = '';

  protected readonly validatorKey = 'cq-text-control';

  constructor(
    formBuilder: FormBuilder,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    super(formBuilder, changeDetectorRef);
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.id = Math.random().toString();
  }

  public createControl(): FormControl {
    return this.formBuilder.control(null, [
      Validators.required,
    ]);
  }

  public createValueFromInputData(inputData: string | null): string | null {
    return inputData;
  }

  public createInputDataFromValue(value: string | null): string | null {
    if (value) {
      this.control.markAsTouched();
      this.control.updateValueAndValidity();
    }
    return value;
  }
}
