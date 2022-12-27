import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RouteAdminModule } from './route-admin.module';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('../../modules/admin/admin.routing.module').then(m => m.AdminRoutingModule),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [
    RouteAdminModule,
    RouterModule.forChild(routes),
  ],
})
export class RouteAdminRoutingModule {}
