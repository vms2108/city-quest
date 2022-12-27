import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RouteLoginComponent } from './route-login.component';
import { RouteLoginModule } from './route-login.module';

export const routes: Routes = [
  {
    path: '',
    component: RouteLoginComponent,
  },
  {
    path: '*',
    redirectTo: '',
  },
];

@NgModule({
  imports: [
    RouteLoginModule,
    RouterModule.forChild(routes),
  ],
})
export class RouteLoginRoutingModule {}
