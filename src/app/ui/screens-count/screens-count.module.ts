import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ScreensCountPipe } from './screens-count.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    ScreensCountPipe,
  ],
  exports: [
    ScreensCountPipe,
  ],
})
export class ScreensCountModule { }
