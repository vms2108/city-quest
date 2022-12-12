import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { QuestItemModule } from 'src/app/ui/quest-item/quest-item.module';

import { QuestCommonModule } from './common/quest-common.module';
import { QuestComponent } from './quest.component';

@NgModule({
  imports: [
    CommonModule,
    QuestCommonModule,
    QuestItemModule,
  ],
  declarations: [
    QuestComponent,
  ],
  exports: [
    QuestComponent,
  ],
})
export class QuestModule { }
