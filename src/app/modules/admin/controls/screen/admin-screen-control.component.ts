import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { QuestScreen } from 'src/app/common/models/quest-screen';
import { SimpleFormControlBaseComponent } from 'src/app/ui/control-base/simple-form-control.base-component';

import { selectAdminData } from '../../store/selectors/admin.selector';
import { CommonAdminState } from '../../store/states/admin.state';

@Component({
  selector: 'cq-admin-screen-control',
  templateUrl: './admin-screen-control.component.html',
  styleUrls: ['./admin-screen-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AdminScreenControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AdminScreenControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminScreenControlComponent extends SimpleFormControlBaseComponent<string, string> implements OnInit, OnDestroy {

  @Input()
  public label!: string;

  public state = this.store.pipe(select(selectAdminData));

  public list!: string[];

  public screens!: QuestScreen[];

  public ready = false;

  protected readonly validatorKey = 'cq-admin-screen-control';

  private destroy = new Subject<void>();

  constructor(
    formBuilder: FormBuilder,
    changeDetectorRef: ChangeDetectorRef,
    private readonly store: Store<CommonAdminState>,
  ) {
    super(formBuilder, changeDetectorRef);
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.getList();
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  public createControl(): FormControl {
    return this.formBuilder.control(null, [
    ]);
  }

  public createValueFromInputData(inputData: string | null): string | null {
    if (!inputData || !this.screens) {
      return null;
    }

    const foundItem = this.screens.find(item => item.name === inputData);
    return foundItem!._id;
  }

  public createInputDataFromValue(value: string | null): string | null {
    if (!this.screens) {
      return value;
    }
    this.ready = true;
    if (!value) {
      return null;
    }
    const foundItem = this.screens.find(item => item._id === value);
    return foundItem!.name;
  }

  public hasError(errorCode: string): boolean {
    return this.control.dirty && this.control.hasError(errorCode);
  }

  private getList(): void {
    this.state
    .pipe(
      takeUntil(this.destroy),
      filter(data => !!data && !!data.screen.list),
      map(data => {
        this.list = data.screen.list!.map(item => item.name);
        this.screens = data.screen.list!;
        this.changeDetectorRef.markForCheck();
      }),
    )
    .subscribe();
  }

}
