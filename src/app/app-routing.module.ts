import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./route-modules/route-index/route-index.routing.module').then(m => m.RouteIndexRoutingModule),
  },
  {
    path: 'spb',
    loadChildren: () => import('./route-modules/route-spb/route-spb.routing.module').then(m => m.RouteSpbRoutingModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'corrected' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
