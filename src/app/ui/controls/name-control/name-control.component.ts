import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { FormBuilder, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { SimpleFormControlBaseComponent } from 'src/app/ui/control-base/simple-form-control.base-component';

@Component({
  selector: 'cq-name-control',
  templateUrl: './name-control.component.html',
  styleUrls: ['./name-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NameControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => NameControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NameControlComponent extends SimpleFormControlBaseComponent<string, string> {

  @Input()
  public placeholder = '';

  @Input()
  public maxLength = 64;

  protected readonly validatorKey = 'cq-name-control';

  constructor(
    formBuilder: FormBuilder,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    super(formBuilder, changeDetectorRef);
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
    return value;
  }

  public focus(): void {
    window.scrollTo({ top: 90, behavior: 'smooth' });
  }
}
