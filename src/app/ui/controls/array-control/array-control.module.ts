import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { TextControlModule } from '../text-control/text-control.module';

import { ArrayControlComponent } from './array-control.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TextControlModule,
    MatButtonModule,
    MatIconModule,
    DragDropModule,
  ],

  declarations: [
    ArrayControlComponent,
  ],

  exports: [
    ArrayControlComponent,
  ],
})
export class ArrayControlModule {
}
