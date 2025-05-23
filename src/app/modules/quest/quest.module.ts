import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotificationModule } from 'src/app/ui/notifications/notification.module';
import { QuestItemModule } from 'src/app/ui/quest-item/quest-item.module';

import { QuestHeaderComponent } from './header/quest-header.component';
import { QuestScreenComponent } from './quest-screen/quest-screen.component';
import { QuestComponent } from './quest.component';
import { QuestMusicRatingComponent } from './music-rating/quest-music-rating.component';

@NgModule({
  imports: [
    CommonModule,
    QuestItemModule,
    NotificationModule,
  ],
  declarations: [
    QuestComponent,
    QuestScreenComponent,
    QuestHeaderComponent,
    QuestMusicRatingComponent,
  ],
  exports: [
    QuestComponent,
  ],
})
export class QuestModule { }
