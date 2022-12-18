import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { NotificationListComponent } from './notification.component';
import { NotificationService } from './notification.service';

@NgModule({
  imports: [
    CommonModule,
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
