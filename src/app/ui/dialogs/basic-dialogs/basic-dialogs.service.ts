import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BasicDialogConfirmData } from './confirm/basic-dialog-confirm-data.interface';
import { BasicDialogConfirmComponent } from './confirm/basic-dialog-confirm.component';

@Injectable()
export class BasicDialogsService {

  constructor(private dialog: MatDialog) {
  }

  public confirm(actionDescription: string, width = 400, height = 220): Observable<boolean> {

    return this.dialog
      .open<BasicDialogConfirmComponent, BasicDialogConfirmData, boolean>(BasicDialogConfirmComponent, {
        width: `${width}px`,
        height: `${height}px`,
        disableClose: false,
        panelClass: [
          'mat-dialog-no-padding',
        ],
        data: {
          actionDescription,
        },
      })
      .afterClosed()
      .pipe(
        map(confirmed => !!confirmed),
      );
  }

}
