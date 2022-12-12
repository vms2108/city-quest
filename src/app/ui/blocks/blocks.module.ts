import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InnerHtmlModule } from 'src/app/ui/safe-html/inner-html.module';

import { BlockUniversalComponent } from './block-universal/block-universal.component';
import { BLOCKS_COMPONENTS } from './block.components';

@NgModule({
  imports: [
    CommonModule,
    InnerHtmlModule,
  ],
  declarations: [
    BLOCKS_COMPONENTS,
    BlockUniversalComponent,
  ],
  exports: [
    BlockUniversalComponent,
  ],
})
export class BlocksModule {}
