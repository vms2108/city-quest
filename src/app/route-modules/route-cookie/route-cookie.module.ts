import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CookieModule } from 'src/app/modules/cookie/cookie.module';

import { RouteCookieComponent } from './route-cookie.component';

@NgModule({
  imports: [
    CommonModule,
    CookieModule,
  ],
  declarations: [RouteCookieComponent],
})
export class RouteCookieModule { }
