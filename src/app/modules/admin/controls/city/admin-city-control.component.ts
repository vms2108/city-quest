// admin-city-control.component.ts
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { FormBuilder, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Store } from '@ngrx/store';
import { first, Observable } from 'rxjs';
import { City } from 'src/app/common/interfaces/city.interface';
import { selectCities } from 'src/app/modules/admin/store/admin.selectors';
import { CommonState } from 'src/app/store/states/common.state';
import { SimpleFormControlBaseComponent } from 'src/app/ui/control-base/simple-form-control.base-component';
import { loadCities } from '../../store/admin.actions';

@Component({
  selector: 'cq-admin-city-control',
  templateUrl: './admin-city-control.component.html',
  styleUrls: ['./admin-city-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AdminCityControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AdminCityControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCityControlComponent extends SimpleFormControlBaseComponent<string | null, string | null> {
  @Input()
  public label: string = 'Город квеста';

  public availableCities$: Observable<City[]>;
  public cities: City[] = [];

  protected readonly validatorKey = 'cq-admin-city-control';

  constructor(
    formBuilder: FormBuilder,
    changeDetectorRef: ChangeDetectorRef,
    private readonly store: Store<CommonState>
  ) {
    super(formBuilder, changeDetectorRef);
    this.availableCities$ = this.store.select(selectCities);
    this.loadData();
  }

  public createControl(): FormControl {
    return this.formBuilder.control(null);
  }

  public createValueFromInputData(inputData: City | string | null): string | null {
    if (!inputData) return null;
    // Если приходит объект City, извлекаем id
    if (typeof inputData === 'object' && 'id' in inputData) {
      return inputData.id;
    }
    // Если приходит строка, возвращаем как есть
    return inputData;
  }

  public createInputDataFromValue(value: string | null): string | null {
    return value;
  }

  // Универсальная функция displayCity
  displayCity = (input: City | string | null): string => {
    if (!input) return '';

    // Если это строка (id города)
    if (typeof input === 'string') {
      const city = this.cities.find(c => c.id === input);
      return city ? city.name : 'Город не найден';
    }

    // Если это объект City
    return input.name;
  };

  valueCity = (city: City): string => {
    return city.id; // Возвращаем id города
  };

  public searchCity(city: City, search: string): boolean {
    const searchLower = search.toLowerCase();
    return city.name.toLowerCase().includes(searchLower) || city.id.toString().includes(searchLower);
  }

  private loadData(): void {
    this.availableCities$
      .subscribe(cities => {
        this.cities = cities;
        // Обновляем контрол после загрузки городов
        if (this.control.value) {
          this.control.patchValue(this.control.value); // Повторный вызов для обновления отображения
        }
        this.changeDetectorRef.markForCheck();
      });
    this.availableCities$
      .pipe(first())
      .subscribe(cities => {
        if (!cities || cities.length === 0) {
          this.store.dispatch(loadCities());
        }
      });
  }
}
