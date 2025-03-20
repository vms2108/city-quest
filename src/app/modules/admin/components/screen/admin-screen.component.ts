import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Screen } from 'src/app/common/interfaces/screen.interface'; // Интерфейс из common
import { loadScreens, deleteScreen } from '../../store/admin.actions'; // Действия из админки
import { selectScreens } from '../../store/admin.selectors'; // Селектор из админки
import { Column } from 'src/app/common/models/column';
import { BasicDialogsService } from 'src/app/ui/dialogs/basic-dialogs/basic-dialogs.service';
import { NotificationService } from 'src/app/ui/notifications/notification.service';
import { CommonState } from 'src/app/store/states/common.state'; // Общее состояние приложения

@Component({
  selector: 'cq-admin-screen',
  templateUrl: './admin-screen.component.html',
  styleUrls: ['./admin-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminScreenComponent implements OnInit, OnDestroy {
  public screens$: Observable<Screen[]>;

  public displayedColumns = [
    new Column('title', 'Заголовок'), // Поле title из Screen
    new Column('type', 'Тип'),    // Поле blocks для отображения количества блоков
  ];

  public loading = true;

  public selectedItem: Screen | null = null;

  public visibleEditor = false;

  public isCopy = false;

  private destroy = new Subject<void>();

  private editableId: string | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly basicDialogsService: BasicDialogsService,
    private readonly notificationService: NotificationService,
    private readonly store: Store<CommonState> // Используем CommonState
  ) {
    this.screens$ = this.store.select(selectScreens);
  }

  public ngOnInit(): void {
    this.readGetParams();
    this.store.dispatch(loadScreens());
    this.screens$
      .pipe(
        filter(screens => screens.length > 0),
        takeUntil(this.destroy)
      )
      .subscribe(() => {
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

  public selectScreen(item: Screen | null, isCopy = false): void {
    this.isCopy = isCopy;
    this.selectedItem = item;
    if (!isCopy && item) {
      this.editableId = item.id.toString();
    }
    this.visibleEditor = true;
    this.changeDetectorRef.markForCheck();
  }

  public deleteScreen(screen: Screen): void {
    this.confirmDelete(screen)
      .pipe(filter(confirmed => confirmed))
      .subscribe(() => this.removeScreen(screen));
  }

  public upsertScreen(updatedScreen: Screen): void {
    this.closeEditor();
  }

  private removeScreen(screen: Screen): void {
    this.setLoading(true);
    this.store.dispatch(deleteScreen({ id: screen.id }));
    this.notificationService.success('Успешно удалено');
    this.setLoading(false);
  }

  private readGetParams(): void {
    this.editableId = this.route.snapshot.paramMap.get('id');
  }

  private setUpdatedItem(): void {
    if (this.editableId && !this.selectedItem) {
      this.screens$.subscribe(screens => {
        this.selectedItem = screens.find(item => item.id.toString() === this.editableId) || null;
        if (this.selectedItem) {
          this.visibleEditor = true;
          this.changeDetectorRef.markForCheck();
        }
      });
    }
  }

  private confirmDelete(screen: Screen): Observable<boolean> {
    return this.basicDialogsService.confirm(`Вы действительно хотите удалить экран ${screen.title}?`);
  }

  private setLoading(loading: boolean): void {
    this.loading = loading;
    this.changeDetectorRef.markForCheck();
  }
}