import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { InnerHtmlPipe } from './inner-html.pipe';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    InnerHtmlPipe,
  ],
  exports: [
    InnerHtmlPipe,
  ],
})
export class InnerHtmlModule { }
