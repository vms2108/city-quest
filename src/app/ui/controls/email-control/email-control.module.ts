import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputDirectiveModule } from 'src/app/ui/input-directive/input-directive.module';

import { EmailControlComponent } from './email-control.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    InputDirectiveModule,
  ],

  declarations: [
    EmailControlComponent,
  ],

  exports: [
    EmailControlComponent,
  ],
})
export class EmailControlModule {
}
