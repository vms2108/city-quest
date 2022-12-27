import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';

import { AutofocusDirective } from './autofocus.directive';
import { OptionComponent } from './option/option.component';
import { SelectControlComponent } from './select-control.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    ScrollingModule,
  ],

  declarations: [
    OptionComponent,
    SelectControlComponent,
    AutofocusDirective,
  ],

  exports: [
    OptionComponent,
    SelectControlComponent,
  ],
})
export class SelectControlModule {
}
