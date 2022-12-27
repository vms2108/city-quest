
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { FormBuilder, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ScreenTypesEnum } from 'src/app/common/enums/screen-types.enum';
import { assocEnumToArray } from 'src/app/ui/control-base/helpers/public-api';
import { SimpleFormControlBaseComponent } from 'src/app/ui/control-base/simple-form-control.base-component';

@Component({
  selector: 'cq-admin-screen-type-control',
  templateUrl: './admin-screen-type-control.component.html',
  styleUrls: ['./admin-screen-type-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AdminScreenTypeControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AdminScreenTypeControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminScreenTypeControlComponent extends SimpleFormControlBaseComponent<string, string> {

  @Input()
  public label!: string;

  public readonly list = assocEnumToArray<ScreenTypesEnum>(ScreenTypesEnum);

  protected readonly validatorKey = 'cq-admin-screen-type-control';

  constructor(
    formBuilder: FormBuilder,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    super(formBuilder, changeDetectorRef);
  }

  public createControl(): FormControl {
    return this.formBuilder.control(null, [
    ]);
  }

  public createValueFromInputData(inputData: string | null): string | null {
    return inputData;
  }

  public createInputDataFromValue(value: string | null): string | null {
    return value;
  }

  public hasError(errorCode: string): boolean {
    return this.control.dirty && this.control.hasError(errorCode);
  }

}
