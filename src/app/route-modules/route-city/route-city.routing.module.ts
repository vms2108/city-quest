import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RouteCityComponent } from './route-city.component';
import { RouteCityModule } from './route-city.module';

export const routes: Routes = [
  {
    path: '',
    component: RouteCityComponent,
  },
  {
    path: '*',
    redirectTo: '',
  },
];

@NgModule({
  imports: [
    RouteCityModule,
    RouterModule.forChild(routes),
  ],
})
export class RouteCityRoutingModule {}
