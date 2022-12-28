import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { OptionComponent } from './option/option.component';
import { SelectControlComponent } from './select-control.component';
import { SelectDirective } from './select.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],

  declarations: [
    OptionComponent,
    SelectControlComponent,
    SelectDirective,
  ],

  exports: [
    OptionComponent,
    SelectControlComponent,
  ],
})
export class SelectControlModule {
}
