import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ScreenTypesEnum } from 'src/app/common/enums/screen-types.enum';
import { QuestScreenParameters } from 'src/app/common/models/quest-screen-parameters';
import { SimpleFormControlBaseComponent } from 'src/app/ui/control-base/simple-form-control.base-component';

@Component({
  selector: 'cq-admin-parameters-control',
  templateUrl: './admin-parameters-control.component.html',
  styleUrls: ['./admin-parameters-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AdminParametersControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AdminParametersControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminParametersControlComponent extends SimpleFormControlBaseComponent<QuestScreenParameters, QuestScreenParameters> {

  @Input()
  public type!: ScreenTypesEnum;

  public form!: FormGroup;

  protected readonly validatorKey = 'cq-admin-parameters-control';

  private destroy = new Subject<void>();

  constructor(
    formBuilder: FormBuilder,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    super(formBuilder, changeDetectorRef);
    this.createForm();
  }

  public createControl(): FormControl {
    return this.formBuilder.control(null, [Validators.required]);
  }

  public createValueFromInputData(inputData: QuestScreenParameters | null): QuestScreenParameters | null {
    return inputData;
  }

  public createInputDataFromValue(value: QuestScreenParameters | null): QuestScreenParameters | null {
    if (value) {
      this.form.patchValue(value, { emitEvent: false });
    }

    return value;
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      blocks: [[]],
      answers: [[]],
      help: [''],
    });

    this.form
      .valueChanges
      .pipe(
        takeUntil(this.destroy),
      )
      .subscribe(result => {
        this.control.setValue(result);
        this.changeDetectorRef.markForCheck();
      });
  }
}
