import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil, first } from 'rxjs/operators';
import { Block } from 'src/app/common/interfaces/block.interface';
import { loadBlocks, deleteBlock } from '../../store/admin.actions';
import { selectBlocks } from '../../store/admin.selectors';
import { Column } from 'src/app/common/models/column';
import { BasicDialogsService } from 'src/app/ui/dialogs/basic-dialogs/basic-dialogs.service';
import { NotificationService } from 'src/app/ui/notifications/notification.service';
import { CommonState } from 'src/app/store/states/common.state';

@Component({
  selector: 'cq-admin-block',
  templateUrl: './admin-block.component.html',
  styleUrls: ['./admin-block.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminBlockComponent implements OnInit, OnDestroy {
  public blocks$: Observable<Block[]>;

  public displayedColumns = [
    new Column('title', 'Название'),
    new Column('type', 'Тип блока'),
    new Column('content', 'Содержимое'),
  ];

  public loading = true;

  public selectedItem: Block | null = null;

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
    this.blocks$ = this.store.select(selectBlocks);
  }

  public ngOnInit(): void {
    this.readGetParams();
    this.loadData();
    this.blocks$
      .pipe(filter(blocks => blocks.length > 0), takeUntil(this.destroy))
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
    this.isCopy = false;
    this.changeDetectorRef.markForCheck();
  }

  public selectBlock(item: Block | null, isCopy = false): void {
    this.isCopy = isCopy;
    this.selectedItem = item;
    if (!isCopy && item) {
      this.editableId = item.id.toString();
    }
    this.visibleEditor = true;
    this.changeDetectorRef.markForCheck();
  }

  public deleteBlock(block: Block): void {
    this.confirmDelete(block)
      .pipe(filter(confirmed => confirmed))
      .subscribe(() => this.removeBlock(block));
  }

  private loadData(): void {
    this.blocks$
      .pipe(first())
      .subscribe(blocks => {
        if (!blocks || blocks.length === 0) {
          this.store.dispatch(loadBlocks());
        } else {
          this.setLoading(false);
        }
      });
  }

  private removeBlock(block: Block): void {
    this.setLoading(true);
    this.store.dispatch(deleteBlock({ id: block.id }));
    this.notificationService.success('Успешно удалено');
    this.setLoading(false);
  }

  private readGetParams(): void {
    this.editableId = this.route.snapshot.paramMap.get('id');
  }

  private setUpdatedItem(): void {
    if (this.editableId && !this.selectedItem) {
      this.blocks$.subscribe(blocks => {
        this.selectedItem = blocks.find(item => item.id.toString() === this.editableId) || null;
        if (this.selectedItem) {
          this.visibleEditor = true;
          this.changeDetectorRef.markForCheck();
        }
      });
    }
  }

  private confirmDelete(block: Block): Observable<boolean> {
    return this.basicDialogsService.confirm(`Вы действительно хотите удалить блок ${block.type}?`);
  }

  private setLoading(loading: boolean): void {
    this.loading = loading;
    this.changeDetectorRef.markForCheck();
  }
}