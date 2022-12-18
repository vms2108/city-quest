import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ScreenBtnComponent } from './screen-btn.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ScreenBtnComponent,
  ],
  exports: [
    ScreenBtnComponent,
  ],
})
export class ScreenBtnModule { }
