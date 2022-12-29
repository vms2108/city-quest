import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { LocalFile } from 'src/app/ui/controls/file-control/models/local-file';
import { NotificationService } from 'src/app/ui/notifications/notification.service';

import { AdminImageService } from '../common/admin-image.service';

@Component({
  selector: 'cq-image-editor',
  templateUrl: './image-editor.component.html',
  styleUrls: ['./image-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageEditorComponent implements OnInit, OnDestroy {

  @Output()
  public imageChanged = new EventEmitter<boolean>();

  public form!: FormGroup;

  public loading = false;

  private destroy =  new Subject<void>();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly adminImageService: AdminImageService,
    private readonly notificationService: NotificationService,
  ) {
  }

  public ngOnInit(): void {
    this.createEmptyForm();
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  public apply(): void {
    const file = this.form.value.file;
    this.create(file);
  }

  private create(file: LocalFile): void {

    this.setLoading(true);
    this.adminImageService
      .createImage(file)
      .pipe(
        finalize(() => this.setLoading(false)),
        takeUntil(this.destroy),
      )
      .subscribe(() => {
        this.notificationService.success('Картинка успешно сохранена.');
        this.imageChanged.emit(true);
      });
  }

  private createEmptyForm(): void {
    this.form = this.formBuilder.group({
      file: [null, Validators.required],
    });
  }

  private setLoading(loading: boolean): void {
    this.loading = loading;
    this.changeDetectorRef.markForCheck();
  }
}
