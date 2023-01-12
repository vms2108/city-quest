import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { filter, finalize, map, takeUntil, tap } from 'rxjs/operators';
import { QuestService } from 'src/app/common/data/quest/quest.service';
import { QuestShort } from 'src/app/common/models/quest-short';
import { NotificationService } from 'src/app/ui/notifications/notification.service';

import { GetScreensFromServer } from '../../store/actions/screen.actions';
import { selectAdminData } from '../../store/selectors/admin.selector';

import { CommonAdminState } from './../../store/states/admin.state';

@Component({
  selector: 'cq-quest-editor',
  templateUrl: './quest-editor.component.html',
  styleUrls: ['./quest-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestEditorComponent implements OnChanges, OnInit {

  @Input()
  public isCopy = false;

  @Input()
  public quest: QuestShort | null = null;

  @Output()
  public questChanged = new EventEmitter<void>();

  @ViewChild('currentContainer', { read: ViewContainerRef })
  public currentContainer!: ViewContainerRef;

  public state = this.store.pipe(select(selectAdminData));

  public form!: FormGroup;

  public loading = false;

  public showForm = false;

  private destroy =  new Subject<void>();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly questService: QuestService,
    private readonly notificationService: NotificationService,
    private readonly store: Store<CommonAdminState>,
  ) {
  }

  public ngOnChanges(): void {
    if (this.quest) {
      this.createFillForm();
    } else {
      this.createEmptyForm();
    }
  }

  public ngOnInit(): void {
    this.getList();
  }

  public apply(): void {
    const quest = this.form.value;
    this.isCopy ? this.create(quest) : this.quest ? this.update(quest) : this.create(quest);
  }

  private update(quest: QuestShort): void {
    quest._id = this.quest!._id;

    this.setLoading(true);
    this.questService
      .updateQuest(quest)
      .pipe(
        finalize(() => this.setLoading(false)),
        takeUntil(this.destroy),
      )
      .subscribe(() => {
        this.notificationService.success('Квест успешно изменен.');
        this.questChanged.emit();
      });
  }

  private create(quest: QuestShort): void {
    this.setLoading(true);
    this.questService
      .createQuest(quest)
      .pipe(
        finalize(() => this.setLoading(false)),
        takeUntil(this.destroy),
      )
      .subscribe(() => {
        this.notificationService.success('Квест успешно сохранён.');
        this.questChanged.emit();
      });
  }

  private createEmptyForm(): void {
    this.form = this.formBuilder.group({
      id: [''],
      city: [''],
      items: [[]],
      link: [''],
      name: [''],
      pictureLink: [''],
      text: [''],
    });
  }

  private createFillForm(): void {
    this.form = this.formBuilder.group({
      id: [this.quest!._id],
      city: [this.quest!.city],
      items: [this.quest!.items],
      link: [this.quest!.link],
      name: [this.quest!.name],
      pictureLink: [this.quest!.pictureLink],
      text: [this.quest!.text],
    });
  }

  private setLoading(loading: boolean): void {
    this.loading = loading;
    this.changeDetectorRef.markForCheck();
  }

  private getList(): void {
    this.state
    .pipe(
      tap(data => {
        if (!data.screen.list) {
          this.store.dispatch(new GetScreensFromServer());
          return;
        }
      }),
      takeUntil(this.destroy),
      filter(data => !!data && !!data.screen.list),
      map(() => {
        this.showForm = true;
        this.changeDetectorRef.markForCheck();
      }),
    )
    .subscribe();
  }
}
