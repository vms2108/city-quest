import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotificationModule } from 'src/app/ui/notifications/notification.module';
import { QuestItemModule } from 'src/app/ui/quest-item/quest-item.module';

import { QuestCommonModule } from './common/quest-common.module';
import { QuestHeaderComponent } from './header/quest-header.component';
import { QuestScreenComponent } from './quest-screen/quest-screen.component';
import { QuestComponent } from './quest.component';

@NgModule({
  imports: [
    CommonModule,
    QuestCommonModule,
    QuestItemModule,
    NotificationModule,
  ],
  declarations: [
    QuestComponent,
    QuestScreenComponent,
    QuestHeaderComponent,
  ],
  exports: [
    QuestComponent,
  ],
})
export class QuestModule { }
