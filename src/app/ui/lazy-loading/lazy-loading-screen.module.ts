import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LazyLoadingScreenService } from './lazy-loading-screen.service';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    LazyLoadingScreenService,
  ],
})
export class LazyLoadingScreenModule {}
