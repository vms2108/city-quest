import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RouteQuestComponent } from './route-quest.component';
import { RouteQuestModule } from './route-quest.module';

export const routes: Routes = [
  {
    path: '',
    component: RouteQuestComponent,
  },
  {
    path: '*',
    redirectTo: '',
  },
];

@NgModule({
  imports: [
    RouteQuestModule,
    RouterModule.forChild(routes),
  ],
})
export class RouteQuestRoutingModule {}
