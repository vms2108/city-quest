import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, forwardRef, Input, OnInit, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { SimpleFormControlBaseComponent } from 'src/app/ui/control-base/simple-form-control.base-component';

@Component({
  selector: 'cq-array-control',
  templateUrl: './array-control.component.html',
  styleUrls: ['./array-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ArrayControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ArrayControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArrayControlComponent<TItemData> extends SimpleFormControlBaseComponent<TItemData[], TItemData[]> implements OnInit {

  @Input()
  public minSize = 1;

  @Input()
  public maxSize: number | null = null;

  @Input()
  public dragVisible = true;

  @Input()
  public initialItemValue = (() => null);

  @ContentChild('itemControl', { static: true })
  public itemControlTemplate!: TemplateRef<any>;

  public itemsControl!: FormArray;

  protected validatorKey = 'cq-array-control';

  private itemsSubscriptions = new Subscription();

  private emitItemsChange = true;

  constructor(
    formBuilder: FormBuilder,
    changeDetectorRef: ChangeDetectorRef,
  ) {
    super(formBuilder, changeDetectorRef);
  }

  public ngOnInit(): void {
    this.createItemsControl();
    super.ngOnInit();
  }

  public createControl(): FormControl {
    return this.formBuilder.control(null);
  }

  public writeValue(value: TItemData[] | null): void {
    super.writeValue(value);
    this.syncItemsControlWithValue();
  }

  public createValueFromInputData(inputData: TItemData[] | null): TItemData[] | null {
    return inputData;
  }

  public createInputDataFromValue(value: TItemData[] | null): TItemData[] | null {
    return value;
  }

  public allowAddingItem(): boolean {
    return this.maxSize !== null && this.maxSize <= this.itemsControl.controls.length;
  }

  public addEmptyItem(): void {
    this.itemsControl.insert(this.itemsControl.length, this.createItemControl(this.initialItemValue()));
  }

  public removeItem(index: number): void {
    if (this.itemsControl.controls.length <= this.minSize) {
      return;
    }

    this.itemsControl.removeAt(index);
    this.changeDetectorRef.markForCheck();
  }

  public changeItemPosition(event: CdkDragDrop<TItemData>): void {
    const newValue = [...<TItemData[]> this.itemsControl.value];
    moveItemInArray(newValue, event.previousIndex, event.currentIndex);
    this.itemsControl.setValue(newValue);
  }

  private createItemsControl(): void {
    this.itemsControl = this.formBuilder.array([
      this.createItemControl(null),
    ]);

    const changeItemsSubscription = this.itemsControl
      .valueChanges
      .pipe(
        filter(() => this.emitItemsChange),
        map<TItemData[] | null, TItemData[]>(value => (value || []).filter(item => item !== null && String(item) !== '')),
        map(value => value.length ? value : null),
      )
      .subscribe(value => this.control.setValue(value));
    this.itemsSubscriptions.add(changeItemsSubscription);
  }

  private createItemControl(value: TItemData | null): FormControl {
    return this.formBuilder.control(value);
  }

  private syncItemsControlWithValue(): void {
    this.emitItemsChange = false;

    for (let i = 0, l = this.itemsControl.controls.length; i < l; i++) {
      this.itemsControl.removeAt(0);
    }

    if (this.control.disabled) {
      this.itemsControl.disable();
    }

    const itemsValues = (<TItemData[]> (this.control.value || []));
    if (typeof(itemsValues) !== 'string') {
      itemsValues
      .map(itemValue => this.createItemControl(itemValue))
      .forEach(control => this.itemsControl.insert(this.itemsControl.length, control));
    }

    this.emitItemsChange = true;

    this.addMinItems();
    this.changeDetectorRef.markForCheck();
  }

  private addMinItems(): void {
    if (this.minSize === null) {
      return;
    }

    for (let i = this.itemsControl.controls.length; i < this.minSize; i++) {
      this.addEmptyItem();
    }
  }

}
