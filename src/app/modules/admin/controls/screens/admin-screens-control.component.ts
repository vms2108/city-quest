import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { FormBuilder, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Store } from '@ngrx/store';
import { first, Observable } from 'rxjs';
import { Screen } from 'src/app/common/interfaces/screen.interface';
import { selectScreens } from 'src/app/modules/admin/store/admin.selectors';
import { CommonState } from 'src/app/store/states/common.state';
import { SimpleFormControlBaseComponent } from 'src/app/ui/control-base/simple-form-control.base-component';
import { loadScreens } from '../../store/admin.actions';

@Component({
  selector: 'cq-admin-screens-control',
  templateUrl: './admin-screens-control.component.html',
  styleUrls: ['./admin-screens-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AdminScreensControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AdminScreensControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminScreensControlComponent extends SimpleFormControlBaseComponent<Screen[], Screen[]> {
  @Input()
  public label: string = 'Экраны квеста';

  public availableScreens$: Observable<Screen[]>;

  protected readonly validatorKey = 'cq-admin-screens-control';

  constructor(
    formBuilder: FormBuilder,
    changeDetectorRef: ChangeDetectorRef,
    private readonly store: Store<CommonState>
  ) {
    super(formBuilder, changeDetectorRef);
    this.availableScreens$ = this.store.select(selectScreens);
    this.loadData();
  }

  public createControl(): FormControl {
    return this.formBuilder.control([], []);
  }

  public createValueFromInputData(inputData: Screen[] | null): Screen[] | null {
    return inputData;
  }

  public createInputDataFromValue(value: Screen[] | null): Screen[] | null {
    return value;
  }

  public initialItemValue = () => null;

  public addScreen(screen: Screen): void {
    const currentScreens = this.control.value || [];
    this.control.setValue([...currentScreens, { ...screen, order: currentScreens.length + 1 }]);
    this.changeDetectorRef.markForCheck();
  }

  public removeScreen(index: number): void {
    const currentScreens = this.control.value || [];
    currentScreens.splice(index, 1);
    this.control.setValue(currentScreens.map((s: Screen, i: number) => ({ ...s, order: i + 1 })));
    this.changeDetectorRef.markForCheck();
  }

  displayScreen = (screen: Screen) => `${screen.title}`; // Отображаем только заголовок
  valueScreen = (screen: Screen) => screen; // Возвращаем весь объект

  public searchScreen(screen: Screen, search: string): boolean {
    const searchLower = search.toLowerCase();
    return screen.title.toLowerCase().includes(searchLower) || screen.id.toString().includes(searchLower);
  }

  private loadData(): void {
    this.availableScreens$
      .pipe(first())
      .subscribe(screens => {
        if (!screens || screens.length === 0) {
          this.store.dispatch(loadScreens());
        }
      });
  }
}
