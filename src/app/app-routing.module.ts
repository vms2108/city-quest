import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./route-modules/route-index/route-index.routing.module').then(m => m.RouteIndexRoutingModule),
  },
  {
    path: ':city',
    loadChildren: () => import('./route-modules/route-city/route-city.routing.module').then(m => m.RouteCityRoutingModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'corrected' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
