import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { FormBuilder, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { ScreenBlock } from 'src/app/common/models/screen-block';
import { SimpleFormControlBaseComponent } from 'src/app/ui/control-base/simple-form-control.base-component';

@Component({
  selector: 'cq-admin-blocks-control',
  templateUrl: './admin-blocks-control.component.html',
  styleUrls: ['./admin-blocks-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AdminBlocksControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AdminBlocksControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminBlocksControlComponent extends SimpleFormControlBaseComponent<ScreenBlock[], ScreenBlock[]> {

  @Input()
  public label!: string;

  protected readonly validatorKey = 'cq-admin-blocks-control';

  constructor(
    formBuilder: FormBuilder,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    super(formBuilder, changeDetectorRef);
  }

  public createControl(): FormControl {
    return this.formBuilder.control(null, [Validators.required]);
  }

  public createValueFromInputData(inputData: ScreenBlock[] | null): ScreenBlock[] | null {
    return inputData;
  }

  public createInputDataFromValue(value: ScreenBlock[] | null): ScreenBlock[] | null {
    return value;
  }

  public initialItemValue = () => null;

}
