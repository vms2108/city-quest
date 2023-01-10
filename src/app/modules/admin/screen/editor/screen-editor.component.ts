import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, SimpleChange, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { finalize, takeUntil, throttleTime } from 'rxjs/operators';
import { ScreenService } from 'src/app/common/data/screen/screen.service';
import { QuestScreen } from 'src/app/common/models/quest-screen';
import { ALLCOMPONENTS, LazyLoadingScreenService } from 'src/app/ui/lazy-loading/lazy-loading-screen.service';
import { NotificationService } from 'src/app/ui/notifications/notification.service';

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
  public screenChanged = new EventEmitter<void>();

  @ViewChild('currentContainer', { read: ViewContainerRef })
  public currentContainer!: ViewContainerRef;

  public exampleScreen!: QuestScreen;

  public form!: FormGroup;

  public loading = false;

  private destroy =  new Subject<void>();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly screenService: ScreenService,
    private readonly notificationService: NotificationService,
    private readonly lazyLoadingScreenService: LazyLoadingScreenService,
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
    screen._id = this.screen!._id;

    this.setLoading(true);
    this.screenService
      .updateScreen(screen)
      .pipe(
        finalize(() => this.setLoading(false)),
        takeUntil(this.destroy),
      )
      .subscribe(() => {
        this.notificationService.success('Экран успешно изменен.');
        this.screenChanged.emit();
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
        this.screenChanged.emit();
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
    this.lazyLoadCurrentCard(this.exampleScreen);
    this.formValueChanges();
  }

  private formValueChanges(): void {
    this.form
    .valueChanges
    .pipe(
      takeUntil(this.destroy),
      throttleTime(400),
    )
    .subscribe(data => {
      this.exampleScreen = this.form.value;
      this.lazyLoadCurrentCard(this.exampleScreen);
      this.changeDetectorRef.markForCheck();
    });
  }

  private setLoading(loading: boolean): void {
    this.loading = loading;
    this.changeDetectorRef.markForCheck();
  }

  private async lazyLoadCurrentCard(screen: QuestScreen): Promise<void> {
    if (this.currentContainer) {
      this.currentContainer.clear();
    }
    const quizCardFactory = await this.lazyLoadingScreenService.getComponentByScreen(screen);
    this.changeDetectorRef.markForCheck();
    const { instance } = this.currentContainer.createComponent<ALLCOMPONENTS>(quizCardFactory);
    instance.screen = screen;
    instance.fromAdmin = true;
    (instance as any).ngOnChanges([new SimpleChange(null, screen, true)]);
  }
}
