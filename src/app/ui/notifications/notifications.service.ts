import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { SnackBarComponent } from './snack-bar/snack-bar.component';

@Injectable()
export class NotificationsService {

  constructor(private snackBar: MatSnackBar) {
  }

  public warning(message: string, matIcon = 'warning'): void {
    this.custom(message, matIcon, '#ff6d00');
  }

  public custom(message: string, matIcon: string, color: string): void {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 30000,
      data: {
        message,
        matIcon,
        color,
      },
    });
  }

}
