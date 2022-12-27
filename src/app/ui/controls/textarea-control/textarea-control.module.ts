import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { TextareaControlComponent } from './textarea-control.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],

  declarations: [
    TextareaControlComponent,
  ],

  exports: [
    TextareaControlComponent,
  ],
})
export class TextareaControlModule {
}
