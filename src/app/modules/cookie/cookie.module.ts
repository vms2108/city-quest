import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CookieComponent } from './cookie.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CookieComponent
  ],
  exports: [
    CookieComponent
  ]
})
export class CookieModule { }
