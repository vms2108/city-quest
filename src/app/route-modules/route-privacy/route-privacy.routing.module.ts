import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RoutePrivacyComponent } from './route-privacy.component';
import { RoutePrivacyModule } from './route-privacy.module';

export const routes: Routes = [
  {
    path: '',
    component: RoutePrivacyComponent,
  },
  {
    path: '*',
    redirectTo: '',
  },
];

@NgModule({
  imports: [
    RoutePrivacyModule,
    RouterModule.forChild(routes),
  ],
})
export class RoutePrivacyRoutingModule {}
