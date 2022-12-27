import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NumberControlComponent } from './number-control.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],

  declarations: [
    NumberControlComponent,
  ],

  exports: [
    NumberControlComponent,
  ],
})
export class NumberControlModule {}
