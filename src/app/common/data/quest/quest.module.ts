import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { QuestService } from './quest.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    QuestService,
  ],
})
export class DataQuestModule{}
