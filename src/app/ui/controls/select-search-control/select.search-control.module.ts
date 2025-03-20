import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelect, MatSelectModule } from '@angular/material/select';

import { SelectControlModule } from '../select-control/select-control.module';

import { SelectSearchControlComponent } from './select-search-control.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    SelectControlModule,
  ],

  providers: [
    MatSelect,
  ],

  declarations: [
    SelectSearchControlComponent,
  ],

  exports: [
    SelectSearchControlComponent,
  ],
})
export class SelectSearchControlModule {
}
