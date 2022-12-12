import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { QuestItemComponent } from './quest-item.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    QuestItemComponent,
  ],
  exports: [
    QuestItemComponent,
  ],
})
export class QuestItemModule { }
