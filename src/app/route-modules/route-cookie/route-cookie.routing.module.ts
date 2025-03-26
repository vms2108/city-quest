import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RouteCookieComponent } from './route-cookie.component';
import { RouteCookieModule } from './route-cookie.module';

export const routes: Routes = [
  {
    path: '',
    component: RouteCookieComponent,
  },
  {
    path: '*',
    redirectTo: '',
  },
];

@NgModule({
  imports: [
    RouteCookieModule,
    RouterModule.forChild(routes),
  ],
})
export class RouteCookieRoutingModule {}
