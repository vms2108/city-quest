import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RouteSpbComponent } from './route-spb.component';
import { RouteSpbModule } from './route-spb.module';

export const routes: Routes = [
  {
    path: '',
    component: RouteSpbComponent,
  },
  {
    path: '*',
    redirectTo: '',
  },
];

@NgModule({
  imports: [
    RouteSpbModule,
    RouterModule.forChild(routes),
  ],
})
export class RouteSpbRoutingModule {}
