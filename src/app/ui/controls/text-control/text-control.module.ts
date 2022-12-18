import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TextControlComponent } from './text-control.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],

  declarations: [
    TextControlComponent,
  ],

  exports: [
    TextControlComponent,
  ],
})
export class TextControlModule {}
