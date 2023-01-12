import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ScreenService } from './screen.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    ScreenService,
  ],
})
export class DataScreenModule{}
