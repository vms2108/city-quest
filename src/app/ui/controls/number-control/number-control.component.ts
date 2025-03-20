import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { SimpleFormControlBaseComponent } from 'src/app/ui/control-base/simple-form-control.base-component';

@Component({
  selector: 'cq-number-control',
  templateUrl: './number-control.component.html',
  styleUrls: ['./number-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NumberControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberControlComponent extends SimpleFormControlBaseComponent<number, number> implements OnInit {

  @Input()
  public label = '';

  @Input()
  public maxLength = 1000;

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

  public createValueFromInputData(inputData: number | null): number | null {
    return inputData;
  }

  public createInputDataFromValue(value: number | null): number | null {
    return value;
  }
}
