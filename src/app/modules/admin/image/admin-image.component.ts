import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, finalize, map, takeUntil, tap } from 'rxjs/operators';
import { ImageService } from 'src/app/common/data/image/image.service';
import { Column } from 'src/app/common/models/column';
import { ScreenImage } from 'src/app/common/models/screen-image';
import { BasicDialogsService } from 'src/app/ui/dialogs/basic-dialogs/basic-dialogs.service';
import { NotificationService } from 'src/app/ui/notifications/notification.service';

import { GetImagesFromServer } from '../store/actions/image.actions';
import { selectAdminData } from '../store/selectors/admin.selector';
import { CommonAdminState } from '../store/states/admin.state';

@Component({
  selector: 'cq-admin-image',
  templateUrl: './admin-image.component.html',
  styleUrls: ['./admin-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminImageComponent implements OnInit, OnDestroy {

  public state = this.store.pipe(select(selectAdminData));

  public displayedColumns = [
    new Column('imageSrc', 'Ссылка'),
  ];

  public loading = true;

  public visibleEditor = false;

  private destroy = new Subject<void>();

  constructor(
    private readonly imageService: ImageService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly basicDialogsService: BasicDialogsService,
    private readonly notificationService: NotificationService,
    private readonly store: Store<CommonAdminState>,
  ) { }

  public ngOnInit(): void {
    this.getList();
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  public updateInfo(): void {
    this.setLoading(true);
    this.closeEditor();
    this.getList();
  }

  public closeEditor(): void {
    this.visibleEditor = false;
    this.changeDetectorRef.markForCheck();
  }

  public openEditor(): void {
    this.visibleEditor = true;
    this.changeDetectorRef.markForCheck();
  }

  public deleteImage(image: ScreenImage): void {
    this.confirmDelete(image)
      .pipe(
        filter(confirmed => confirmed),
      )
    .subscribe(() => this.removeImage(image));
  }

  private getList(): void {
    this.state
    .pipe(
      tap(data => {
        if (!data.image.list) {
          this.store.dispatch(new GetImagesFromServer());
          return;
        }
      }),
      takeUntil(this.destroy),
      map(() => this.setLoading(false)),
    )
    .subscribe();
  }

  private removeImage(image: ScreenImage): void {
    this.setLoading(true);

    this.imageService
      .deleteImage(image._id)
      .pipe(
        map(() => {
          this.notificationService.success('Успешно удалено');
          this.store.dispatch(new GetImagesFromServer());
        }),
        finalize(() => this.setLoading(false)),
        takeUntil(this.destroy),
      )
      .subscribe();
  }

  private confirmDelete(image: { imageSrc: string }): Observable<boolean> {
    return this.basicDialogsService.confirm(`Вы действительно хотите удалить экран ${ image.imageSrc }?`);
  }

  private setLoading(loading: boolean): void {
    this.loading = loading;
    this.changeDetectorRef.markForCheck();
  }

}
