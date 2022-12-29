import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminModule } from './admin.module';
import { AdminImageComponent } from './image/admin-image.component';
import { AdminQuestComponent } from './quest/admin-quest.component';
import { AdminScreenComponent } from './screen/admin-screen.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'quest',
    pathMatch: 'full',
  },
  {
    path: 'screen',
    component: AdminScreenComponent,
  },
  {
    path: 'screen/:id',
    component: AdminScreenComponent,
  },
  {
    path: 'quest',
    component: AdminQuestComponent,
  },
  {
    path: 'screen/:id',
    component: AdminQuestComponent,
  },
  {
    path: 'image',
    component: AdminImageComponent,
  },
  {
    path: '**',
    redirectTo: 'quest',
    pathMatch: 'full',
  },

];

@NgModule({
  imports: [
    AdminModule,
    RouterModule.forChild(routes),
  ],
})
export class AdminRoutingModule {
}
