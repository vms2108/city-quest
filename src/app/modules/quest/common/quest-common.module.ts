import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { LazyLoadingScreenModule } from 'src/app/ui/lazy-loading/lazy-loading-screen.module';

import { QuestService } from './quest.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    LazyLoadingScreenModule,
  ],
  providers: [
    QuestService,
  ],
})
export class QuestCommonModule {}
