import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { InputDirectiveModule } from '../../input-directive/input-directive.module';

import { TextControlComponent } from './text-control.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputDirectiveModule,
  ],

  declarations: [
    TextControlComponent,
  ],

  exports: [
    TextControlComponent,
  ],
})
export class TextControlModule {}
