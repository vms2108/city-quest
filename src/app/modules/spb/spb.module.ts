import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { QuestInfoModule } from 'src/app/ui/quest-info/quest-info.module';

import { SpbService } from './common/services/spb.service';
import { SpbComponent } from './spb.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    QuestInfoModule,
  ],
  declarations: [
    SpbComponent,
  ],
  providers: [
    SpbService,
  ],
  exports: [
    SpbComponent,
  ],
})
export class SpbModule {}
