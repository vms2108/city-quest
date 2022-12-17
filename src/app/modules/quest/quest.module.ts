import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { QuestItemModule } from 'src/app/ui/quest-item/quest-item.module';

import { QuestCommonModule } from './common/quest-common.module';
import { QuestScreenComponent } from './quest-screen/quest-screen.component';
import { QuestComponent } from './quest.component';

@NgModule({
  imports: [
    CommonModule,
    QuestCommonModule,
    QuestItemModule,
  ],
  declarations: [
    QuestComponent,
    QuestScreenComponent,
  ],
  exports: [
    QuestComponent,
  ],
})
export class QuestModule { }
