import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { SimpleFormControlBaseComponent } from 'src/app/ui/control-base/simple-form-control.base-component';

@Component({
  selector: 'cq-password-control',
  templateUrl: './password-control.component.html',
  styleUrls: ['./password-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => PasswordControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordControlComponent extends SimpleFormControlBaseComponent<string, string> implements OnInit {

  @Input()
  public label: string | null = '';

  public id = '';

  protected readonly validatorKey = 'cq-password-control';

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
    return value;
  }
}
