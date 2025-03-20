import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef } from '@angular/core';
import { FormBuilder, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SimpleFormControlBaseComponent } from 'src/app/ui/control-base/simple-form-control.base-component';

@Component({
  selector: 'cq-checkbox-control',
  templateUrl: './checkbox-control.component.html',
  styleUrls: ['./checkbox-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CheckboxControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxControlComponent extends SimpleFormControlBaseComponent<boolean, boolean> {

  public id!: string;

  public name!: string;

  protected readonly validatorKey = 'ik-checkbox-control';

  constructor(
    formBuilder: FormBuilder,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    super(formBuilder, changeDetectorRef);
    this.generateName();
  }

  public createControl(): FormControl {
    return this.formBuilder.control(null);
  }

  public createValueFromInputData(inputData: boolean | null): boolean | null {
    return inputData;
  }

  public createInputDataFromValue(value: boolean | null): boolean | null {
    return value;
  }

  private generateName(): void {
    this.name = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    this.id = `${this.name}-id`;
  }
}
