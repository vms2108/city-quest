import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { INDEX_CONTAINERS } from './containers/index.containers';
import { IndexCarouselComponent } from './index-carousel/index-carousel.component';
import { IndexComponent } from './index.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    IndexComponent,
    IndexCarouselComponent,
    INDEX_CONTAINERS,
  ],
  exports: [
    IndexComponent,
  ],
})
export class IndexModule { }
