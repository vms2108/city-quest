import { ChangeDetectorRef, Injectable, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormControl, ValidationErrors, Validator } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { delay, map, throttleTime } from 'rxjs/operators';

import { ChangeEventFn, defaultChangeEventFn, defaultTouchEventFn, defaultValidateEventFn, TouchEventFn, ValidateEventFn } from './helpers/control-value-accessor.defaults';

@Injectable()
export abstract class SimpleFormControlBaseComponent<TInputData, TValueData> implements OnInit, OnDestroy, ControlValueAccessor, Validator {

  public control!: FormControl;

  protected touchEventHandler: TouchEventFn = defaultTouchEventFn;

  protected changeEventHandler: ChangeEventFn<TValueData> = defaultChangeEventFn;

  protected validatorChange: ValidateEventFn = defaultValidateEventFn;

  protected controlSubscriptions = new Subscription();

  protected lastValue: TValueData | null = null;

  protected abstract readonly validatorKey: string;

  private refreshValue = new Subject<TValueData | null>();

  protected constructor(
    protected formBuilder: FormBuilder,
    protected changeDetectorRef: ChangeDetectorRef,
  ) {
  }

  public abstract createControl(): FormControl;

  public abstract createValueFromInputData(inputData: TInputData | null): TValueData | null;

  public abstract createInputDataFromValue(value: TValueData | null): TInputData | null;

  // tslint:disable:contextual-life-cycle
  public ngOnInit(): void {
    this.initialControl();
  }

  public writeValue(value: TValueData | null): void {
    const inputData = this.createInputDataFromValue(value);
    this.lastValue = value;
    this.control.setValue(inputData, { emitEvent: false });
  }

  public registerOnChange(fn: ChangeEventFn<TValueData>): void {
    this.changeEventHandler = fn;
  }

  public registerOnTouched(fn: TouchEventFn): void {
    this.touchEventHandler = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.control.disable({ emitEvent: false });
    } else {
      this.control.enable({ emitEvent: false });
    }
    this.changeDetectorRef.markForCheck();
  }

  public registerOnValidatorChange(fn: ValidateEventFn): void {
    this.validatorChange = fn;
  }

  public validate(control: AbstractControl): ValidationErrors | null {
    if (this.control.invalid) {
      return { [this.validatorKey]: true };
    }

    return null;
  }

  public ngOnDestroy(): void {
    this.controlSubscriptions.unsubscribe();
  }

  protected initialControl(): void {
    this.control = this.createControl();
    const changeValueSubscription = this.control
      .valueChanges
      .pipe(
        delay(1),
        map(rawValue => {
          this.touchEventHandler();
          return rawValue;
        }),
        map(rawValue => this.createValueFromInputData(rawValue)),
      )
      .subscribe(value => this.refreshValue.next(value));
    this.controlSubscriptions.add(changeValueSubscription);

    const changeStatusSubscription = this.control
      .statusChanges
      .subscribe(() => this.refreshValue.next(this.createValueFromInputData(this.control.value)));
    this.controlSubscriptions.add(changeStatusSubscription);

    this.validatorChange();

    const refreshValueSubscription = this.refreshValue
      .pipe(
        throttleTime(1),
      )
      .subscribe(value => this.changeValue(value));
    this.controlSubscriptions.add(refreshValueSubscription);
  }

  protected changeValue(value: TValueData | null): void {
    if (JSON.stringify(value) !== JSON.stringify(this.lastValue)) {
      this.lastValue = value;
      this.changeEventHandler(value);
      this.validatorChange();
    } else if (this.control.invalid) {
      this.validatorChange();
    }
    this.changeDetectorRef.markForCheck();
  }

}
