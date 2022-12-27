import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

import { ControlErrorComponent } from './control-error/control-error.component';
import { FormFieldControlDirective } from './form-field-control/form-field-control.directive';
import { FormFieldErrorsDirective } from './form-field-errors/form-field-errors.directive';
import { FormFieldLabelComponent } from './form-field-label/form-field-label.component';
import { VerticalFormFieldComponent } from './vertical-form-field/vertical-form-field.component';

@NgModule({
  imports: [
    CommonModule,
    MatTooltipModule,
  ],

  declarations: [
    VerticalFormFieldComponent,
    FormFieldControlDirective,
    FormFieldErrorsDirective,
    ControlErrorComponent,
    FormFieldLabelComponent,
  ],

  exports: [
    VerticalFormFieldComponent,
    FormFieldControlDirective,
    FormFieldErrorsDirective,
    ControlErrorComponent,
    FormFieldLabelComponent,
  ],
})
export class FormFieldsModule { }
