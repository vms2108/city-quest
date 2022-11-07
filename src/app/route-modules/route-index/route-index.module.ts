import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IndexModule } from 'src/app/modules/index/index.module';

import { RouteIndexComponent } from './route-index.component';

@NgModule({
  imports: [
    CommonModule,
    IndexModule,
  ],
  declarations: [
    RouteIndexComponent,
  ],
})
export class RouteIndexModule { }
