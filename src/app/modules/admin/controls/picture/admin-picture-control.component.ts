import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { SimpleFormControlBaseComponent } from 'src/app/ui/control-base/simple-form-control.base-component';

import { GetImagesFromServer } from '../../store/actions/image.actions';
import { selectAdminData } from '../../store/selectors/admin.selector';
import { CommonAdminState } from '../../store/states/admin.state';

@Component({
  selector: 'cq-admin-picture-control',
  templateUrl: './admin-picture-control.component.html',
  styleUrls: ['./admin-picture-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AdminPictureControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AdminPictureControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminPictureControlComponent extends SimpleFormControlBaseComponent<string, string> implements OnInit, OnDestroy {

  @Input()
  public label!: string;

  public state = this.store.pipe(select(selectAdminData));

  public list!: string[];

  protected readonly validatorKey = 'cq-admin-picture-control';

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
    return inputData;
  }

  public createInputDataFromValue(value: string | null): string | null {
    return value;
  }

  public hasError(errorCode: string): boolean {
    return this.control.dirty && this.control.hasError(errorCode);
  }

  private getList(): void {
    this.state
    .pipe(
      tap(data => {
        if (!data.image.list) {
          this.store.dispatch(new GetImagesFromServer());
          return;
        }
      }),
      takeUntil(this.destroy),
      filter(data => !!data && !!data.image.list),
      map(data => {
        this.list = data.image.list!.map(item => item.imageSrc);
        this.changeDetectorRef.markForCheck();
      }),
    )
    .subscribe();
  }

}
