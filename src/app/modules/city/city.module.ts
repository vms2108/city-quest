import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { QuestInfoModule } from 'src/app/ui/quest-info/quest-info.module';

import { CityComponent } from './city.component';
import { CityCommonModule } from './common/city-common.module';

@NgModule({
  imports: [
    CommonModule,
    CityCommonModule,
    QuestInfoModule,
  ],
  declarations: [
    CityComponent,
  ],
  exports: [
    CityComponent,
  ],
})
export class CityModule { }
