import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { NotificationsService } from './notifications.service';
import { SnackBarComponent } from './snack-bar/snack-bar.component';

@NgModule({
  imports: [
    CommonModule,
    MatSnackBarModule,
  ],

  declarations: [
    SnackBarComponent,
  ],

  providers: [
    NotificationsService,
  ],

  entryComponents: [
    SnackBarComponent,
  ],
})
export class NotificationsModule {
}
