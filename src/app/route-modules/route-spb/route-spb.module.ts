import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SpbModule } from 'src/app/modules/spb/spb.module';

import { RouteSpbComponent } from './route-spb.component';

@NgModule({
  imports: [
    CommonModule,
    SpbModule,
  ],
  declarations: [RouteSpbComponent],
})
export class RouteSpbModule { }
