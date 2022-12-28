import { Location } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter, finalize, map, takeUntil } from 'rxjs/operators';
import { Column } from 'src/app/common/models/column';
import { QuestScreen } from 'src/app/common/models/quest-screen';
import { BasicDialogsService } from 'src/app/ui/dialogs/basic-dialogs/basic-dialogs.service';
import { NotificationService } from 'src/app/ui/notifications/notification.service';

import { AdminScreenService } from './common/admin-screen.service';

@Component({
  selector: 'cq-admin-screen',
  templateUrl: './admin-screen.component.html',
  styleUrls: ['./admin-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminScreenComponent implements OnInit, OnDestroy {

  public list!: QuestScreen[];

  public displayedColumns = [
    new Column('name', 'Заголовок'),
    new Column('type', 'Тип'),
  ];

  public loading = true;

  public selectedItem: QuestScreen | null = null;

  public visibleEditor = false;

  public isCopy = false;

  private destroy = new Subject<void>();

  private editableId: string | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly adminScreenService: AdminScreenService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly location: Location,
    private readonly basicDialogsService: BasicDialogsService,
    private readonly notificationService: NotificationService,
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
    this.location.go('/admin/screen');
    this.changeDetectorRef.markForCheck();
  }

  public selectScreen(item: QuestScreen | null, isCopy = false): void {
    this.isCopy = isCopy;
    this.selectedItem = item;
    if (!isCopy && item) {
      this.location.go(`/admin/screen/${ item.id }`);
    }
    this.visibleEditor = true;
    this.changeDetectorRef.markForCheck();
  }

  public deleteScreen(screen: QuestScreen): void {
    this.confirmDelete(screen)
      .pipe(
        filter(confirmed => confirmed),
      )
    .subscribe(() => this.removeScreen(screen));
  }

  private removeScreen(screen: QuestScreen): void {
    this.setLoading(true);

    this.adminScreenService
      .deleteScreen(screen.id)
      .pipe(
        map(() => {
          this.notificationService.success('Успешно удалено');
          this.getList();
        }),
        finalize(() => this.setLoading(false)),
        takeUntil(this.destroy),
      )
      .subscribe();

  }

  private readGetParams(): void {
    this.editableId = this.route.snapshot.paramMap.get('id') || null;
  }

  private getList(): void {
    this.adminScreenService
      .loadList()
      .pipe(
        map(data => {
          this.list = data;
          this.setUpdatedItem();
        }),
        takeUntil(this.destroy),
        finalize(() => this.setLoading(false)),
      )
      .subscribe();
  }

  private setUpdatedItem(): void {
    if (this.selectedItem) {
      this.selectedItem = this.list.find(item => item.id === this.selectedItem!.id)!;
      return;
    }
    if (this.editableId && this.list.find(item => item.id === this.editableId)) {
      this.selectedItem = this.list.find(item => item.id === this.editableId)!;
      this.visibleEditor = true;
      this.changeDetectorRef.markForCheck();
    }
  }

  private confirmDelete(screen: QuestScreen): Observable<boolean> {
    return this.basicDialogsService.confirm(`Вы действительно хотите удалить экран ${screen.name}?`);
  }

  private setLoading(loading: boolean): void {
    this.loading = loading;
    this.changeDetectorRef.markForCheck();
  }

}