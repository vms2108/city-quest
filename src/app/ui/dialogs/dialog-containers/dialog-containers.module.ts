import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';

import { DialogContainerBasicComponent } from './basic/dialog-container-basic.component';

@NgModule({
  imports: [
    CommonModule,
    MatListModule,
    MatDialogModule,
  ],

  declarations: [
    DialogContainerBasicComponent,
  ],

  exports: [
    DialogContainerBasicComponent,
  ],
})
export class DialogContainersModule {
}
