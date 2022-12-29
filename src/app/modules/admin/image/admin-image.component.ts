import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { filter, finalize, map, takeUntil } from 'rxjs/operators';
import { Column } from 'src/app/common/models/column';
import { BasicDialogsService } from 'src/app/ui/dialogs/basic-dialogs/basic-dialogs.service';
import { NotificationService } from 'src/app/ui/notifications/notification.service';

import { AdminImageService } from './common/admin-image.service';

@Component({
  selector: 'cq-admin-image',
  templateUrl: './admin-image.component.html',
  styleUrls: ['./admin-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminImageComponent implements OnInit, OnDestroy {

  public list!: { _id: string, imageSrc: string }[];

  public displayedColumns = [
    new Column('imageSrc', 'Ссылка'),
  ];

  public loading = true;

  public visibleEditor = false;

  private destroy = new Subject<void>();

  constructor(
    private readonly adminImageService: AdminImageService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly basicDialogsService: BasicDialogsService,
    private readonly notificationService: NotificationService,
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

  public deleteImage(image: { imageSrc: string, _id: string }): void {
    this.confirmDelete(image)
      .pipe(
        filter(confirmed => confirmed),
      )
    .subscribe(() => this.removeImage(image));
  }

  private getList(): void {
    this.adminImageService
      .loadList()
      .pipe(
        map(data => {
          this.list = data;
        }),
        takeUntil(this.destroy),
        finalize(() => this.setLoading(false)),
      )
      .subscribe();
  }

  private removeImage(image: { imageSrc: string, _id: string }): void {
    this.setLoading(true);

    this.adminImageService
      .deleteImage(image._id)
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

  private confirmDelete(image: { imageSrc: string }): Observable<boolean> {
    return this.basicDialogsService.confirm(`Вы действительно хотите удалить экран ${ image.imageSrc }?`);
  }

  private setLoading(loading: boolean): void {
    this.loading = loading;
    this.changeDetectorRef.markForCheck();
  }

}
