import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { LazyLoadingScreenService } from './lazy-loading-screen.service';
import { QuestService } from './quest.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    QuestService,
    LazyLoadingScreenService,
  ],
})
export class QuestCommonModule {}
