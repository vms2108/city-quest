import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { CheckboxControlComponent } from './checkbox-control.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatCheckboxModule,
  ],

  declarations: [
    CheckboxControlComponent,
  ],

  exports: [
    CheckboxControlComponent,
  ],
})
export class CheckboxControlModule {
}
