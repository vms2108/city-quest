
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { FormBuilder, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BlockTypesEnum } from 'src/app/common/enums/block-types.enum';
import { assocEnumToArray } from 'src/app/ui/control-base/helpers/public-api';
import { SimpleFormControlBaseComponent } from 'src/app/ui/control-base/simple-form-control.base-component';

@Component({
  selector: 'cq-admin-block-type-control',
  templateUrl: './admin-block-type-control.component.html',
  styleUrls: ['./admin-block-type-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AdminBlockTypeControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AdminBlockTypeControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminBlockTypeControlComponent extends SimpleFormControlBaseComponent<string, string> {

  @Input()
  public label!: string;

  public readonly list = assocEnumToArray<BlockTypesEnum>(BlockTypesEnum);

  protected readonly validatorKey = 'cq-admin-block-type-control';

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
