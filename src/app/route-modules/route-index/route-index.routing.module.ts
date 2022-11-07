import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RouteIndexComponent } from './route-index.component';
import { RouteIndexModule } from './route-index.module';

export const routes: Routes = [
  {
    path: '',
    component: RouteIndexComponent,
  },
  {
    path: '*',
    redirectTo: '',
  },
];

@NgModule({
  imports: [
    RouteIndexModule,
    RouterModule.forChild(routes),
  ],
})
export class RouteIndexRoutingModule {}
