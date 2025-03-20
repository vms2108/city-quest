// quest-editor.component.ts
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Quest } from 'src/app/common/interfaces/quest.interface';
import { Screen } from 'src/app/common/interfaces/screen.interface';
import { City } from 'src/app/common/interfaces/city.interface';
import { NotificationService } from 'src/app/ui/notifications/notification.service';
import { createQuest, updateQuest, loadCities, loadScreens } from '../../../store/admin.actions';
import { selectCities, selectScreens } from '../../../store/admin.selectors';
import { CommonState } from 'src/app/store/states/common.state';

@Component({
  selector: 'cq-quest-editor',
  templateUrl: './quest-editor.component.html',
  styleUrls: ['./quest-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestEditorComponent implements OnInit, OnChanges {
  @Input()
  public isCopy = false;

  @Input()
  public quest: Quest | null = null;

  @Output()
  public questChanged = new EventEmitter<Quest>();

  @Output()
  public closeEditor = new EventEmitter<void>();

  public form!: FormGroup;
  public cities: City[] = [];
  public screens: Screen[] = [];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly notificationService: NotificationService,
    private readonly store: Store<CommonState>
  ) {}

  public ngOnInit(): void {
    this.store.select(selectCities).subscribe(cities => {
      this.cities = cities;
      this.changeDetectorRef.markForCheck();
    });
    this.store.select(selectScreens).subscribe(screens => {
      this.screens = screens;
      this.changeDetectorRef.markForCheck();
    });
    if (!this.cities.length) {
      this.store.dispatch(loadCities());
    }
    if (!this.screens.length) {
      this.store.dispatch(loadScreens());
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['quest']) {
      this.quest ? this.createFillForm() : this.createEmptyForm();
    }
  }

  public apply(): void {
    if (this.form.invalid) return;
  
    const questData = this.form.value;
    const screenLinks = questData.screens.map((screen: Screen, index: number) => ({
      screen_id: screen.id,
      order: index + 1,
    }));
  
    const questPayload = {
      title: questData.title,
      description: questData.description,
      is_paid: questData.is_paid,
      free_screens_count: questData.free_screens_count,
      city_id: questData.city_id, // Теперь это string | null
      screens: screenLinks,
    };
  
    if (this.isCopy || !this.quest) {
      this.store.dispatch(createQuest({ quest: questPayload }));
      this.notificationService.success('Квест успешно создан.');
      this.questChanged.emit({ ...questPayload, id: '' });
    } else {
      this.store.dispatch(updateQuest({ id: this.quest.id, quest: questPayload }));
      this.notificationService.success('Квест успешно обновлён.');
      this.questChanged.emit({ ...questPayload, id: this.quest.id });
    }
  
    this.closeEditor.emit();
  }

  private createEmptyForm(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      is_paid: [false],
      free_screens_count: [0, [Validators.min(0)]],
      city_id: [null], // string | null
      screens: [[]],
    });
  }

  private createFillForm(): void {
    this.form = this.formBuilder.group({
      title: [this.quest!.title, Validators.required],
      description: [this.quest!.description, Validators.required],
      is_paid: [this.quest!.is_paid],
      free_screens_count: [this.quest!.free_screens_count, [Validators.min(0)]],
      city_id: [this.quest!.city_id || null], // Просто используем city_id как string | null
      screens: [this.quest!.screens || []],
    });
  }
}