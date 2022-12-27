import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { BasicDialogConfirmData } from './basic-dialog-confirm-data.interface';

@Component({
  templateUrl: 'basic-dialog-confirm.component.html',
  styleUrls: ['basic-dialog-confirm.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicDialogConfirmComponent {

  public actionDescription!: string;

  constructor(@Inject(MAT_DIALOG_DATA) data: BasicDialogConfirmData) {
    this.actionDescription = data.actionDescription;
  }
}
