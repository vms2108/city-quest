import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BlockDistributionService } from './block-distribution.service';

@NgModule({
  imports: [CommonModule],
  providers: [
    BlockDistributionService,
  ],
})
export class ConstructorDistributionModule {}
