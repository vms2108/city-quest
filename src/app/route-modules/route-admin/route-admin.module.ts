import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminModule } from 'src/app/modules/admin/admin.module';

import { RouteAdminComponent } from './route-admin.component';

@NgModule({
  imports: [
    CommonModule,
    AdminModule,
  ],
  declarations: [RouteAdminComponent],
})
export class RouteAdminModule { }
