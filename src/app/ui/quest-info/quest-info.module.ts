import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { QuestInfoComponent } from './quest-info.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    QuestInfoComponent,
  ],
  exports: [
    QuestInfoComponent,
  ],
},
)
export class QuestInfoModule{}
