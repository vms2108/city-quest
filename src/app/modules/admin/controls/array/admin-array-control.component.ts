import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { FormBuilder, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { SimpleFormControlBaseComponent } from 'src/app/ui/control-base/simple-form-control.base-component';

@Component({
  selector: 'cq-admin-array-control',
  templateUrl: './admin-array-control.component.html',
  styleUrls: ['./admin-array-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AdminArrayControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AdminArrayControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminArrayControlComponent extends SimpleFormControlBaseComponent<string[], string[]> {

  @Input()
  public label!: string;

  protected readonly validatorKey = 'cq-admin-array-control';

  constructor(
    formBuilder: FormBuilder,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    super(formBuilder, changeDetectorRef);
  }

  public createControl(): FormControl {
    return this.formBuilder.control(null, [Validators.required]);
  }

  public createValueFromInputData(inputData: string[] | null): string[] | null {
    return inputData;
  }

  public createInputDataFromValue(value: string[] | null): string[] | null {
    return value;
  }

  public initialItemValue = () => null;

}
