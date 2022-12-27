import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginModule } from 'src/app/modules/login/login.module';

import { RouteLoginComponent } from './route-login.component';

@NgModule({
  imports: [
    CommonModule,
    LoginModule,
  ],
  declarations: [RouteLoginComponent],
})
export class RouteLoginModule { }
