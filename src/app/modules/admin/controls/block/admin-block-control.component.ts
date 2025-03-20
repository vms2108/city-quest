import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { FormBuilder, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Block } from 'src/app/common/interfaces/block.interface';
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
export class AdminBlockControlComponent extends SimpleFormControlBaseComponent<Block, Block> {
  @Input()
  public availableBlocks: Block[] = [];

  protected readonly validatorKey = 'cq-admin-block-control';

  constructor(
    formBuilder: FormBuilder,
    changeDetectorRef: ChangeDetectorRef
  ) {
    super(formBuilder, changeDetectorRef);
  }

  public createControl(): FormControl {
    return this.formBuilder.control(null, [Validators.required]);
  }

  public createValueFromInputData(inputData: Block | null): Block | null {
    return inputData;
  }

  public createInputDataFromValue(value: Block | null): Block | null {
    return value;
  }

  public onBlockChange(blockId: string): void {
    const selectedBlock = this.availableBlocks.find(block => block.id === blockId);
    if (selectedBlock) {
      this.control.setValue(selectedBlock);
      this.changeDetectorRef.markForCheck();
    }
  }
}