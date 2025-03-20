import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { FormBuilder, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Store } from '@ngrx/store';
import { first, Observable } from 'rxjs';
import { Block } from 'src/app/common/interfaces/block.interface';
import { selectBlocks } from 'src/app/modules/admin/store/admin.selectors';
import { CommonState } from 'src/app/store/states/common.state';
import { SimpleFormControlBaseComponent } from 'src/app/ui/control-base/simple-form-control.base-component';
import { loadBlocks } from '../../store/admin.actions';

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
export class AdminBlocksControlComponent extends SimpleFormControlBaseComponent<Block[], Block[]> {
  @Input()
  public label: string = 'Блоки экрана';

  public availableBlocks$: Observable<Block[]>;

  protected readonly validatorKey = 'cq-admin-blocks-control';

  constructor(
    formBuilder: FormBuilder,
    changeDetectorRef: ChangeDetectorRef,
    private readonly store: Store<CommonState>
  ) {
    super(formBuilder, changeDetectorRef);
    this.availableBlocks$ = this.store.select(selectBlocks);
    this.loadData();
  }

  public createControl(): FormControl {
    return this.formBuilder.control([], []);
  }

  public createValueFromInputData(inputData: Block[] | null): Block[] | null {
    return inputData;
  }

  public createInputDataFromValue(value: Block[] | null): Block[] | null {
    return value;
  }

  public initialItemValue = () => null;

  public addBlock(block: Block): void {
    const currentBlocks = this.control.value || [];
    this.control.setValue([...currentBlocks, { ...block, order: currentBlocks.length + 1 }]);
    this.changeDetectorRef.markForCheck();
  }

  public removeBlock(index: number): void {
    const currentBlocks = this.control.value || [];
    currentBlocks.splice(index, 1);
    this.control.setValue(currentBlocks.map((b: Block, i: number) => ({ ...b, order: i + 1 })));
    this.changeDetectorRef.markForCheck();
  }

  displayBlock = (block: Block) => `${block.title} [${block.type}]`;
  valueBlock = (block: Block) => block; // Возвращаем весь объект

  public searchBlock(block: Block, search: string): boolean {
    const searchLower = search.toLowerCase();
    return block.type.toLowerCase().includes(searchLower) || block.id.toString().includes(searchLower);
  }

  private loadData(): void {
    this.availableBlocks$
      .pipe(first())
      .subscribe(blocks => {
        if (!blocks || blocks.length === 0) {
          this.store.dispatch(loadBlocks());
        }
      });
  }
}