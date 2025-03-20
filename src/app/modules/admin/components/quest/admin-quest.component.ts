import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Quest } from 'src/app/common/interfaces/quest.interface';
import { loadQuests, deleteQuest } from '../../store/admin.actions';
import { selectQuests } from '../../store/admin.selectors';
import { Column } from 'src/app/common/models/column';
import { BasicDialogsService } from 'src/app/ui/dialogs/basic-dialogs/basic-dialogs.service';
import { NotificationService } from 'src/app/ui/notifications/notification.service';
import { CommonState } from 'src/app/store/states/common.state';

@Component({
  selector: 'cq-admin-quest',
  templateUrl: './admin-quest.component.html',
  styleUrls: ['./admin-quest.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminQuestComponent implements OnInit, OnDestroy {
  public quests$: Observable<Quest[]>;

  public displayedColumns = [
    new Column('title', 'Заголовок'), // Поле title из Quest
  ];

  public loading = true;

  public selectedItem: Quest | null = null;

  public visibleEditor = false;

  public isCopy = false;

  private destroy = new Subject<void>();

  private editableId: string | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly basicDialogsService: BasicDialogsService,
    private readonly notificationService: NotificationService,
    private readonly store: Store<CommonState>
  ) {
    this.quests$ = this.store.select(selectQuests);
  }

  public ngOnInit(): void {
    this.readGetParams();
    this.store.dispatch(loadQuests());
    this.quests$.pipe(
      filter(quests => quests.length > 0),
      takeUntil(this.destroy)
    ).subscribe(() => {
      this.setLoading(false);
      this.setUpdatedItem();
    });
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  public closeEditor(): void {
    this.visibleEditor = false;
    this.editableId = null;
    this.selectedItem = null;
    this.changeDetectorRef.markForCheck();
  }

  public selectQuest(item: Quest | null, isCopy = false): void {
    this.isCopy = isCopy;
    this.selectedItem = item;
    if (!isCopy && item) {
      this.editableId = item.id.toString();
    }
    this.visibleEditor = true;
    this.changeDetectorRef.markForCheck();
  }

  public deleteQuest(quest: Quest): void {
    this.confirmDelete(quest)
      .pipe(filter(confirmed => confirmed))
      .subscribe(() => this.removeQuest(quest));
  }

  public upsertQuest(updatedQuest: Quest): void {
    this.setLoading(true);
    this.closeEditor();
  }

  private removeQuest(quest: Quest): void {
    this.setLoading(true);
    this.store.dispatch(deleteQuest({ id: quest.id }));
    this.notificationService.success('Успешно удалено');
    this.setLoading(false);
  }

  private readGetParams(): void {
    this.editableId = this.route.snapshot.paramMap.get('id');
  }

  private setUpdatedItem(): void {
    if (this.editableId && !this.selectedItem) {
      this.quests$.subscribe(quests => {
        this.selectedItem = quests.find(item => item.id.toString() === this.editableId) || null;
        if (this.selectedItem) {
          this.visibleEditor = true;
          this.changeDetectorRef.markForCheck();
        }
      });
    }
  }

  private confirmDelete(quest: Quest): Observable<boolean> {
    return this.basicDialogsService.confirm(`Вы действительно хотите удалить квест ${quest.title}?`);
  }

  private setLoading(loading: boolean): void {
    this.loading = loading;
    this.changeDetectorRef.markForCheck();
  }
}