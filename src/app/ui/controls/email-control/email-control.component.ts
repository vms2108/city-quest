import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, forwardRef, OnChanges, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { SimpleFormControlBaseComponent } from 'src/app/ui/control-base/simple-form-control.base-component';

@Component({
  selector: 'cq-email-control',
  templateUrl: './email-control.component.html',
  styleUrls: ['./email-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EmailControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => EmailControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailControlComponent extends SimpleFormControlBaseComponent<string, string> implements OnChanges, OnInit, AfterViewInit {

  @ViewChild('emailInput')
  public emailInput!: ElementRef;

  public id = '';

  public emailList = ['gmail.com', 'mail.ru', 'yandex.ru', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com', 'aol.com'];

  public filteredList: string[] = [];

  protected readonly validatorKey = 'ik-email-control';

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

  public ngOnChanges(): void {
  }

  public ngAfterViewInit(): void {
    this.focus();
  }

  public createControl(): FormControl {
    return this.formBuilder.control(null, [
      Validators.required,
      Validators.pattern(/^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
    ]);
  }

  public createValueFromInputData(inputData: string | null): string | null {
    if (!inputData) {
      return null;
    }
    this.searchEmailProviders(inputData.toLowerCase());
    return inputData.toLowerCase();
  }

  public createInputDataFromValue(value: string | null): string | null {
    return value;
  }

  public focus(): void {
    if (this.emailInput) {
      this.emailInput.nativeElement.focus();
    } else {
      setTimeout(() => this.emailInput.nativeElement.focus(), 700);
    }
  }

  public selectDomain(item: string): void {
    const finalValue = `${ this.control.value.split('@')[0] }@${ item }`;
    this.control.setValue(finalValue);
    this.emailInput.nativeElement.blur();
  }

  private searchEmailProviders(str: string): void {

    if (str.indexOf('@') === -1) {
      this.filteredList = [];
      this.changeDetectorRef.markForCheck();
      return;
    }

    const substr = str.split('@').pop();
    if (!substr) {
      this.filteredList = this.emailList.slice(0, 3);
      this.changeDetectorRef.markForCheck();
      return;
    }

    if (this.emailList.find(item => item === substr)) {
      this.filteredList = [];
      return;
    }

    let arr: string[] = [];

    if (substr.length) {
      arr = this.emailList.filter(item => item.indexOf(substr) === 0);
    }

    this.filteredList = !arr.length ? [] : arr.length >= 3 ? arr.slice(0, 3) : arr;
    this.changeDetectorRef.markForCheck();
  }
}
