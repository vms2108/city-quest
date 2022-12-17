import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

import { NameControlComponent } from './name-control.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
  ],

  declarations: [
    NameControlComponent,
  ],

  exports: [
    NameControlComponent,
  ],
})
export class NameControlModule {
}
