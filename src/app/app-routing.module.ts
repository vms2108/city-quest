import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './common/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./route-modules/route-index/route-index.routing.module').then(m => m.RouteIndexRoutingModule),
  },
  {
    path: 'admin',
    loadChildren: () => import('./route-modules/route-admin/route-admin.routing.module').then(m => m.RouteAdminRoutingModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./route-modules/route-login/route-login.routing.module').then(m => m.RouteLoginRoutingModule),
  },
  {
    path: ':city',
    loadChildren: () => import('./route-modules/route-city/route-city.routing.module').then(m => m.RouteCityRoutingModule),
  },
  {
    path: ':city/:quest',
    loadChildren: () => import('./route-modules/route-quest/route-quest.routing.module').then(m => m.RouteQuestRoutingModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
