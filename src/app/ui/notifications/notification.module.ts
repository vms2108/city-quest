import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { NotificationListComponent } from './notification.component';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
  ],
  declarations: [
    NotificationListComponent,
  ],
  exports: [
    NotificationListComponent,
  ],
})
export class NotificationModule {
}
