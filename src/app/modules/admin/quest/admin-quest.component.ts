import { Location } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { QuestService } from 'src/app/common/data/quest/quest.service';
import { Column } from 'src/app/common/models/column';
import { QuestShort } from 'src/app/common/models/quest-short';
import { BasicDialogsService } from 'src/app/ui/dialogs/basic-dialogs/basic-dialogs.service';
import { NotificationService } from 'src/app/ui/notifications/notification.service';

import { selectAdminData } from '../store/selectors/admin.selector';
import { AdminState } from '../store/states/admin.state';

import { GetQuestsFromServer } from './../store/actions/quest.actions';

@Component({
  selector: 'cq-admin-quest',
  templateUrl: './admin-quest.component.html',
  styleUrls: ['./admin-quest.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminQuestComponent implements OnInit, OnDestroy {

  public state = this.store.pipe(select(selectAdminData));

  public list!: QuestShort[];

  public displayedColumns = [
    new Column('name', 'Заголовок'),
    new Column('link', 'Ссылка'),
  ];

  public loading = true;

  public selectedItem: QuestShort | null = null;

  public visibleEditor = false;

  public isCopy = false;

  private destroy = new Subject<void>();

  private editableId: string | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly questService: QuestService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly location: Location,
    private readonly basicDialogsService: BasicDialogsService,
    private readonly notificationService: NotificationService,
    private readonly store: Store<AdminState>,
  ) { }

  public ngOnInit(): void {
    this.readGetParams();
    this.getList();
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  public closeEditor(): void {
    this.visibleEditor = false;
    this.editableId = null;
    this.location.go('/admin/quest');
    this.changeDetectorRef.markForCheck();
  }

  public selectQuest(item: QuestShort | null, isCopy = false): void {
    this.isCopy = isCopy;
    this.selectedItem = item;
    if (!isCopy && item) {
      this.location.go(`/admin/quest/${ item._id }`);
    }
    this.visibleEditor = true;
    this.changeDetectorRef.markForCheck();
  }

  public deleteQuest(quest: QuestShort): void {
    this.confirmDelete(quest)
      .pipe(
        filter(confirmed => confirmed),
      )
    .subscribe(() => this.removeQuest(quest));
  }

  public upsertQuest(): void {
    this.setLoading(true);
    this.store.dispatch(new GetQuestsFromServer());
    this.closeEditor();
  }

  public getByLink(quest: QuestShort): void {
    this.questService.getQuestByLink(quest.link)
      .subscribe(data => console.log(data));
  }

  private removeQuest(quest: QuestShort): void {
    this.setLoading(true);

    this.questService
      .deleteQuest(quest._id)
      .pipe(
        map(() => {
          this.notificationService.success('Успешно удалено');
          this.store.dispatch(new GetQuestsFromServer());
        }),
        takeUntil(this.destroy),
      )
      .subscribe();
  }

  private readGetParams(): void {
    this.editableId = this.route.snapshot.paramMap.get('id') || null;
  }

  private getList(): void {
    this.state
    .pipe(
      tap(data => {
        if (!data || !data.quest.list) {
          this.store.dispatch(new GetQuestsFromServer());
          return;
        }
      }),
      filter(data => !!data && !!data.quest.list),
    )
    .subscribe(data => {
      this.setLoading(false);
      this.list = data.quest.list!;
      this.setUpdatedItem();
    });
  }

  private setUpdatedItem(): void {
    if (this.selectedItem) {
      this.selectedItem = this.list.find(item => item._id === this.selectedItem!._id)!;
      return;
    }
    if (this.editableId && this.list.find(item => item._id === this.editableId)) {
      this.selectedItem = this.list.find(item => item._id === this.editableId)!;
      this.visibleEditor = true;
      this.changeDetectorRef.markForCheck();
    }
  }

  private confirmDelete(quest: QuestShort): Observable<boolean> {
    return this.basicDialogsService.confirm(`Вы действительно хотите удалить квест ${ quest.name }?`);
  }

  private setLoading(loading: boolean): void {
    this.loading = loading;
    this.changeDetectorRef.markForCheck();
  }
}
