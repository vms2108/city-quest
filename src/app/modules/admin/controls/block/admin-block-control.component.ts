import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ScreenTypesEnum } from 'src/app/common/enums/screen-types.enum';
import { ScreenBlock } from 'src/app/common/models/screen-block';
import { SimpleFormControlBaseComponent } from 'src/app/ui/control-base/simple-form-control.base-component';

@Component({
  selector: 'cq-admin-block-control',
  templateUrl: './admin-block-control.component.html',
  styleUrls: ['./admin-block-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AdminBlockControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AdminBlockControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminBlockControlComponent extends SimpleFormControlBaseComponent<ScreenBlock, ScreenBlock> {

  @Input()
  public type!: ScreenTypesEnum;

  public form!: FormGroup;

  protected readonly validatorKey = 'cq-admin-block-control';

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

  public createValueFromInputData(inputData: ScreenBlock | null): ScreenBlock | null {
    return inputData;
  }

  public createInputDataFromValue(value: ScreenBlock | null): ScreenBlock | null {
    if (value) {
      this.form.patchValue(value, { emitEvent: false });
    }

    return value;
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      type: [null],
      text: [''],
      link: [''],
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
