// admin-city-editor.component.ts
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { City } from 'src/app/common/interfaces/city.interface';
import { NotificationService } from 'src/app/ui/notifications/notification.service';
import { createCity, updateCity } from '../../../store/admin.actions';
import { CommonState } from 'src/app/store/states/common.state';

@Component({
  selector: 'cq-admin-city-editor',
  templateUrl: './admin-city-editor.component.html',
  styleUrls: ['./admin-city-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCityEditorComponent implements OnInit, OnChanges {
  @Input()
  public isCopy = false;

  @Input()
  public city: City | null = null;

  @Output()
  public cityChanged = new EventEmitter<City>();

  @Output()
  public closeEditor = new EventEmitter<void>();

  public form!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly notificationService: NotificationService,
    private readonly store: Store<CommonState>
  ) {}

  public ngOnInit(): void {
    this.city ? this.createFillForm() : this.createEmptyForm();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['city']) {
      this.city ? this.createFillForm() : this.createEmptyForm();
    }
  }

  public apply(): void {
    if (this.form.invalid) return;

    const cityData = this.form.value;
    const cityPayload = {
      name: cityData.name,
      parameters: cityData.parameters || null,
      link: cityData.link,
    };

    if (this.isCopy || !this.city) {
      this.store.dispatch(createCity({ city: cityPayload }));
      this.notificationService.success('Город успешно создан.');
      this.cityChanged.emit({ ...cityPayload, id: '0' });
    } else {
      this.store.dispatch(updateCity({ id: this.city.id, city: cityPayload }));
      this.notificationService.success('Город успешно обновлён.');
      this.cityChanged.emit({ ...cityPayload, id: this.city.id });
    }

    this.closeEditor.emit();
  }

  private createEmptyForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      parameters: [null],
      link: ['', Validators.required],
    });
  }

  private createFillForm(): void {
    this.form = this.formBuilder.group({
      name: [this.city!.name, Validators.required],
      parameters: [this.city!.parameters || null],
      link: [this.city!.link, Validators.required],
    });
  }
}