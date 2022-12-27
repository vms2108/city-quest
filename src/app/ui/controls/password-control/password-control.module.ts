import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PasswordControlComponent } from './password-control.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],

  declarations: [
    PasswordControlComponent,
  ],

  exports: [
    PasswordControlComponent,
  ],
})
export class PasswordControlModule {
}
