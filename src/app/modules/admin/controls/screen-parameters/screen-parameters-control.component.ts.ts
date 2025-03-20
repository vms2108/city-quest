import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SimpleFormControlBaseComponent } from 'src/app/ui/control-base/simple-form-control.base-component';

@Component({
  selector: 'cq-screen-parameters-control',
  templateUrl: './screen-parameters-control.component.html',
  styleUrls: ['./screen-parameters-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ScreenParametersControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ScreenParametersControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenParametersControlComponent extends SimpleFormControlBaseComponent<any, any> implements OnChanges {

  @Input()
  public type: 'common' | 'subjects' | 'start' = 'common';

  public form!: FormGroup;

  protected readonly validatorKey = 'cq-screen-parameters-control';

  constructor(formBuilder: FormBuilder, changeDetectorRef: ChangeDetectorRef) {
    super(formBuilder, changeDetectorRef);
    this.createForm();
  }

  public ngOnChanges(): void {
    this.createForm();
    if (this.control.value) {
      this.form.patchValue(this.control.value, { emitEvent: false });
    }
  }

  public createControl(): FormControl {
    return this.formBuilder.control(null);
  }

  public createValueFromInputData(inputData: any | null): any | null {
    return inputData;
  }

  public createInputDataFromValue(value: any | null): any | null {
    if (value) {
      this.form.patchValue(value, { emitEvent: false });
    }
    return value;
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      title: [''],
      text: [''],
      subjects: [[]],
      rightAnswer: ['']
    });

    this.form.valueChanges.subscribe((result: any) => {
      this.control.setValue(result);
      this.changeDetectorRef.markForCheck();
    });
}
}
