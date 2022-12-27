import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { QuestScreen } from 'src/app/common/models/quest-screen';
import { NotificationService } from 'src/app/ui/notifications/notification.service';

import { AdminScreenService } from '../common/admin-screen.service';

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
  public screen: any = null;

  @Output()
  public screenChanged = new EventEmitter<boolean>();

  public exampleScreen!: QuestScreen;

  public form!: FormGroup;

  public loading = false;

  private destroy =  new Subject<void>();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly screenService: AdminScreenService,
    private readonly notificationService: NotificationService,
  ) {
  }

  public ngOnChanges(): void {
    if (this.screen) {
      this.createFillForm();
    } else {
      this.createEmptyForm();
    }
  }

  public apply(): void {
    const screen = this.form.value;
    this.isCopy ? this.create(screen) : this.screen ? this.update(screen) : this.create(screen);
  }

  private update(screen: QuestScreen): void {
    screen.id = this.screen!.id;

    this.setLoading(true);
    this.screenService
      .updateScreen(screen)
      .pipe(
        finalize(() => this.setLoading(false)),
        takeUntil(this.destroy),
      )
      .subscribe(() => {
        this.notificationService.success('Экран успешно изменен.');
        this.screenChanged.emit(true);
      });
  }

  private create(screen: QuestScreen): void {

    this.setLoading(true);
    this.screenService
      .createScreen(screen)
      .pipe(
        finalize(() => this.setLoading(false)),
        takeUntil(this.destroy),
      )
      .subscribe(() => {
        this.notificationService.success('Экран успешно сохранён.');
        this.screenChanged.emit(true);
      });
  }

  private createEmptyForm(): void {
    this.form = this.formBuilder.group({
      id: [''],
      name: [''],
      type: [''],
      parameters: [null],
    });

    this.formValueChanges();
  }

  private createFillForm(): void {
    this.form = this.formBuilder.group({
      id: [this.screen!.id],
      name: [this.screen!.name],
      type: [this.screen!.type],
      parameters: [this.screen!.parameters],
    });

    this.exampleScreen = this.form.value;
    this.formValueChanges();
  }

  private formValueChanges(): void {
    this.form
    .valueChanges
    .pipe(takeUntil(this.destroy))
    .subscribe(() => {
      this.exampleScreen = this.form.value;
      this.changeDetectorRef.markForCheck();
    });
  }

  private setLoading(loading: boolean): void {
    this.loading = loading;
    this.changeDetectorRef.markForCheck();
  }
}
