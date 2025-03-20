import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Screen } from 'src/app/common/interfaces/screen.interface';
import { Block } from 'src/app/common/interfaces/block.interface';
import { NotificationService } from 'src/app/ui/notifications/notification.service';
import { Store } from '@ngrx/store';
import { CommonState } from 'src/app/store/states/common.state';
import { createScreen, updateScreen } from '../../../store/admin.actions';

@Component({
  selector: 'cq-screen-editor',
  templateUrl: './screen-editor.component.html',
  styleUrls: ['./screen-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenEditorComponent implements OnChanges {
  @Input()
  public isCopy = false;

  @Input()
  public screen: Screen | null = null;

  @Output()
  public screenChanged = new EventEmitter<Screen>();

  @Output()
  public closeEditor = new EventEmitter<void>();

  public form!: FormGroup;

  public loading = false;

  public screenTypes = [
    { value: 'common', label: 'Common' },
    { value: 'subjects', label: 'Subjects' },
    { value: 'start', label: 'Start' },
  ];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly notificationService: NotificationService,
    private readonly store: Store<CommonState>
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes['screen']) {
      this.screen ? this.createFillForm() : this.createEmptyForm();
    }
  }

  public apply(): void {
    if (this.form.invalid) return;
    const screenData = this.form.value;
    let blockLinks = [];
    if (screenData.blocks) {
      blockLinks = screenData.blocks.map((block: Block, index: number) => ({
        block_id: block.id,
        order: index + 1,
      }));
    }

    this.setLoading(true);

    if (this.isCopy || !this.screen) {
      this.store.dispatch(
        createScreen({
          title: screenData.title,
          blocks: blockLinks,
          button_text: screenData.button_text,
          parameters: screenData.parameters,
          screenType: screenData.type, // Добавляем type
        })
      );
      this.notificationService.success('Экран успешно сохранён.');
      this.screenChanged.emit({ ...screenData, blocks: screenData.blocks });
      this.closeEditor.emit();
    } else {
      this.store.dispatch(
        updateScreen({
          screen: {
            ...screenData,
            id: this.screen.id,
            blocks: blockLinks,
            button_text: screenData.button_text,
            parameters: screenData.parameters,
            type: screenData.type, // Добавляем type
          },
        })
      );
      this.notificationService.success('Экран успешно изменён.');
      this.screenChanged.emit({ ...screenData, id: this.screen.id, blocks: screenData.blocks });
      this.closeEditor.emit();
    }
  }

  private createEmptyForm(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      button_text: [''],
      parameters: [null],
      type: ['common', Validators.required], // Добавляем type
      blocks: [[]],
    });
  }

  private createFillForm(): void {
    this.form = this.formBuilder.group({
      id: [this.screen!.id],
      title: [this.screen!.title, Validators.required],
      button_text: [this.screen!.button_text || ''],
      parameters: [this.screen!.parameters || null],
      type: [this.screen!.type || 'common', Validators.required], // Добавляем type
      blocks: [this.screen!.blocks || []],
    });
  }

  private setLoading(loading: boolean): void {
    this.loading = loading;
    this.changeDetectorRef.markForCheck();
  }
}