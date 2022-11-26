import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CityModule } from 'src/app/modules/city/city.module';

import { RouteCityComponent } from './route-city.component';

@NgModule({
  imports: [
    CommonModule,
    CityModule,
  ],
  declarations: [RouteCityComponent],
})
export class RouteCityModule { }
