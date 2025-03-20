import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SimpleFormControlBaseComponent } from 'src/app/ui/control-base/simple-form-control.base-component';

@Component({
  selector: 'cq-city-parameters-control',
  templateUrl: './city-parameters-control.component.html',
  styleUrls: ['./city-parameters-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CityParametersControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CityParametersControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityParametersControlComponent extends SimpleFormControlBaseComponent<Record<string, any>, Record<string, any>> {
  public form!: FormGroup;

  protected readonly validatorKey = 'cq-city-parameters-control';

  constructor(formBuilder: FormBuilder, changeDetectorRef: ChangeDetectorRef) {
    super(formBuilder, changeDetectorRef);
    this.createForm();
  }

  public createControl(): FormControl {
    return this.formBuilder.control(null);
  }

  public createValueFromInputData(inputData: Record<string, any> | null): Record<string, any> | null {
    return inputData;
  }

  public createInputDataFromValue(value: Record<string, any> | null): Record<string, any> | null {
    if (value) {
      this.form.patchValue(value, { emitEvent: false });
    }
    return value;
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      header: [''],
      description: ['']
    });

    this.form.valueChanges.subscribe((result: Record<string, any>) => {
      this.control.setValue(result);
      this.changeDetectorRef.markForCheck();
    });
  }
}
