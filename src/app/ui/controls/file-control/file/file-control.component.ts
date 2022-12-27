import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef } from '@angular/core';
import { FormBuilder, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { SimpleFormControlBaseComponent } from 'src/app/ui/control-base/simple-form-control.base-component';
import { NotificationService } from 'src/app/ui/notifications/notification.service';

import { FileTypesEnum } from '../enum/file-types.enum';
import { BaseFile } from '../models/base-file';
import { FileFactory } from '../models/file.models.factory';

type FileInputData =  File | string;

@Component({
  selector: 'cq-file-control',
  templateUrl: './file-control.component.html',
  styleUrls: ['./file-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileControlComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FileControlComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileControlComponent  extends SimpleFormControlBaseComponent<FileInputData, BaseFile<any>> {

  public file!: File;

  protected readonly validatorKey = 'ik-item-file-control';

  constructor(
    formBuilder: FormBuilder,
    changeDetectorRef: ChangeDetectorRef,
    private fileFactory: FileFactory,
    private notificationsService: NotificationService,
  ) {
    super(formBuilder, changeDetectorRef);
  }

  public createControl(): FormControl {
    return this.formBuilder.control(null);
  }

  public onDropFile(file: File): void {
    this.uploadFile(file);
  }

  public selectFile(event: Event): void {
    this.uploadFile((<HTMLInputElement>event.target).files![0]);
  }

  public createValueFromInputData(inputData: FileInputData | null): BaseFile<any> | null {
    if (!inputData) {
      return null;
    }
    if (typeof(inputData) === 'string') {
      return this.fileFactory.createLoadedFile(inputData);
    }
    return this.fileFactory.createLocalFile(inputData);
  }

  public createInputDataFromValue(value: BaseFile<any> | null): File | null {
    if (!value) {
      return null;
    }
    if (value.type === FileTypesEnum.LOCAL) {
      throw new Error('error message');
    }
    return value.data;
  }

  public errorDrop(event: string): any {
    this.notificationsService.error(event, '');
  }

  private uploadFile(file: File): void {
    this.file = file;
    this.control.setValue(this.file);
  }
}
