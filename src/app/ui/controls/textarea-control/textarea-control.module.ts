import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { InputDirectiveModule } from 'src/app/ui/input-directive/input-directive.module';

import { TextareaControlComponent } from './textarea-control.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    InputDirectiveModule,
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
