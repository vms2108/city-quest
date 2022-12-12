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
  {
    path: ':city/:quest',
    loadChildren: () => import('./route-modules/route-quest/route-quest.routing.module').then(m => m.RouteQuestRoutingModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'corrected' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
