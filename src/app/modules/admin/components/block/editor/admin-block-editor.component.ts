import { Component, EventEmitter, Input, Output, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Block } from 'src/app/common/interfaces/block.interface';
import { createBlock, updateBlock } from '../../../store/admin.actions';
import { CommonState } from 'src/app/store/states/common.state';
import * as AdminActions from '../../../store/admin.actions';
import { LocalFile } from 'src/app/ui/controls/file-control/models/local-file';

@Component({
  selector: 'cq-admin-block-editor',
  templateUrl: './admin-block-editor.component.html',
  styleUrls: ['./admin-block-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminBlockEditorComponent implements OnInit, OnDestroy {

  @Input()
  public block: Block | null = null;

  @Input()
  public isCopy: boolean = false;

  @Output()
  public editorClosed = new EventEmitter<void>();

  @Output()
  public blockSaved = new EventEmitter<Block>();

  public blocks!: Block[];

  public fileControl = new FormControl();

  public form: FormGroup;
  public loading = false;
  public blockTypes = [
    { value: 'text', label: 'Текст' },
    { value: 'image', label: 'Изображение' },
    { value: 'audio', label: 'Аудио' },
    { value: 'input', label: 'Ввод' },
    { value: 'choice', label: 'Выбор' },
  ];
  public textSubtypes = [
    { value: 'paragraph', label: 'Параграф' },
    { value: 'heading', label: 'Заголовок' },
    { value: 'subheading', label: 'Подзаголовок' },
    { value: 'quote', label: 'Цитата' },
  ];
  public file: File | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    private readonly store: Store<CommonState>,
    private readonly fb: FormBuilder,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required], // Новое поле
      type: ['', Validators.required],
      subtype: [null],
      content: ['', Validators.required],
    });

    this.form
      .valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(block => {
        this.blocks = [block];
        this.changeDetectorRef.markForCheck();
      })
  }

  public ngOnInit(): void {
    if (this.block) {
      this.form.patchValue({
        title: this.block.title,
        type: this.block.type,
        subtype: this.block.subtype || null,
        content: this.block.content,
      });
    }

    this.fileControl
        .valueChanges
        .subscribe((file: LocalFile) => {
          this.file = file.data;
          this.form.get('content')!.setValue(file.data.name)
        })

    this.store
      .select(state => state)
      .pipe(takeUntil(this.destroy$))
      .subscribe(state => {
        const adminState = state.admin as any;
        if (
          (adminState?.lastAction === AdminActions.createBlockSuccess.type ||
           adminState?.lastAction === AdminActions.updateBlockSuccess.type) &&
          this.loading
        ) {
          this.loading = false;
          const latestBlock = adminState.blocks[adminState.blocks.length - 1];
          this.blockSaved.emit(latestBlock);
        }
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.file = input.files[0];
      this.form.patchValue({ content: this.file.name });
    }
  }

  public apply(): void {
    if (this.form.valid) {
      this.loading = true;
      const formData = new FormData();
      formData.append('title', this.form.get('title')?.value);
      formData.append('type', this.form.get('type')?.value);
      const subtype = this.form.get('subtype')?.value;
      if (subtype) formData.append('subtype', subtype);
      if (this.file && (this.form.get('type')?.value === 'image' || this.form.get('type')?.value === 'audio')) {
        formData.append('file', this.file);
      } else {
        formData.append('content', this.form.get('content')?.value);
      }
      if (this.block && !this.isCopy) {
        formData.append('id', this.block.id);
        this.store.dispatch(updateBlock({ block: formData }));
      } else {
        this.store.dispatch(createBlock({ block: formData }));
      }
      this.close();
    }
  }

  public close(): void {
    this.editorClosed.emit();
  }
}
