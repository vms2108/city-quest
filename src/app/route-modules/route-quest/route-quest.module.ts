import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { QuestModule } from 'src/app/modules/quest/quest.module';

import { RouteQuestComponent } from './route-quest.component';

@NgModule({
  imports: [
    CommonModule,
    QuestModule,
  ],
  declarations: [RouteQuestComponent],
})
export class RouteQuestModule { }
