import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

import { NotificationListComponent } from './notification.component';
import { NotificationService } from './notification.service';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
  ],
  declarations: [
    NotificationListComponent,
  ],
  providers: [
    NotificationService,
  ],
  exports: [
    NotificationListComponent,
  ],
})
export class NotificationModule {
}
