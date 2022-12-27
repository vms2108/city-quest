import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { FormFieldsModule } from '../../form-fields/form-fields.module';

import { DragDropDirective } from './file/drag-drop.directive';
import { FileControlComponent } from './file/file-control.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormFieldsModule,
  ],

  declarations: [
    FileControlComponent,
    DragDropDirective,
  ],

  exports: [
    FileControlComponent,
    DragDropDirective,
  ],
})
export class FileControlModule {
}
