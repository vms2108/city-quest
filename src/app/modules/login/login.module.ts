import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PasswordControlModule } from 'src/app/ui/controls/password-control/password-control.module';
import { TextControlModule } from 'src/app/ui/controls/text-control/text-control.module';
import { FormFieldsModule } from 'src/app/ui/form-fields/form-fields.module';

import { LoginComponent } from './login.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FormFieldsModule,
    TextControlModule,
    PasswordControlModule,
    RouterModule,
  ],
  declarations: [
    LoginComponent,
  ],
  exports: [
    LoginComponent,
  ],
})
export class LoginModule { }
