import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SimpleFormControlBaseComponent } from 'src/app/ui/control-base/simple-form-control.base-component';

@Component({
  selector: 'cq-select-search-control',
  templateUrl: './select-search-control.component.html',
  styleUrls: ['./select-search-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectSearchControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => SelectSearchControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectSearchControlComponent<T> extends SimpleFormControlBaseComponent<T | null, T | null> implements OnInit, OnChanges, OnDestroy {
  @Input()
  public placeholder: string | null = 'Выберите блок';

  @Input()
  public items: T[] = [];

  @Input()
  public displayFn: (item: T) => string = (item) => String(item);

  @Input()
  public valueFn: (item: T) => any = (item) => item;

  @Input()
  public searchFields: string[] = [];

  @Input()
  public width = 220;

  @Input()
  public defaultOptionText = 'Не найдено';

  public filteredItems = new ReplaySubject<T[]>(1);

  public searchControl = new FormControl('');

  public visibleOptions = false; // Изначально скрыто

  protected readonly validatorKey = 'cq-select-search-control';

  private destroy$ = new Subject<void>();

  constructor(
    formBuilder: FormBuilder,
    changeDetectorRef: ChangeDetectorRef
  ) {
    super(formBuilder, changeDetectorRef);
  }

  public ngOnInit(): void {
    super.ngOnInit();
    this.filteredItems.next(this.items.slice());
    this.searchControl.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.filterItems());

    // Устанавливаем начальное значение в строку поиска, если control уже заполнен
    const initialValue = this.control.value;
    if (initialValue) {
      this.searchControl.setValue(this.displayFn(initialValue), { emitEvent: false });
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['items']) {
      this.filteredItems.next(this.items.slice());
      this.filterItems();
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    super.ngOnDestroy();
  }

  public createControl(): FormControl {
    return this.formBuilder.control(null);
  }

  public createValueFromInputData(inputData: T | null): T | null {
    return inputData;
  }

  public createInputDataFromValue(value: T | null): T | null {
    if (value) {
      this.control.markAsTouched();
      this.control.updateValueAndValidity();
      this.searchControl.setValue(this.displayFn(value), { emitEvent: false }); // Подставляем значение в поиск
      this.changeDetectorRef.detectChanges();
    }
    return value;
  }

  public filterItems(): void {
    const search = this.searchControl.value?.toLowerCase() || '';
    if (!this.searchFields.length) {
      this.filteredItems.next(this.items.slice());
      return;
    }
    this.filteredItems.next(
      this.items.filter(item =>
        this.searchFields.some(field =>
          String((item as any)[field]).toLowerCase().includes(search)
        )
      )
    );
  }

  public selectItem(item: T): void {
    this.control.setValue(item);
    this.searchControl.setValue(this.displayFn(item), { emitEvent: false }); // Показываем выбранное значение в поиске
    this.visibleOptions = false; // Скрываем список после выбора
    this.changeDetectorRef.detectChanges();
  }

  public onInputFocus(): void {
    this.visibleOptions = true; // Показываем все элементы при фокусе
    this.filterItems();
    this.changeDetectorRef.detectChanges();
  }

  public onInputBlur(): void {
    setTimeout(() => {
      this.visibleOptions = false; // Скрываем список после потери фокуса
      this.changeDetectorRef.detectChanges();
    }, 200); // Задержка, чтобы обработать клик по опции
  }
}