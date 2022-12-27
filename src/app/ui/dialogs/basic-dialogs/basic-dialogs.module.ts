import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { DialogContainersModule } from '../dialog-containers/dialog-containers.module';

import { BasicDialogsService } from './basic-dialogs.service';
import { BasicDialogConfirmComponent } from './confirm/basic-dialog-confirm.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    DialogContainersModule,
  ],

  declarations: [
    BasicDialogConfirmComponent,
  ],

  providers: [
    BasicDialogsService,
  ],

  entryComponents: [
    BasicDialogConfirmComponent,
  ],
})
export class BasicDialogsModule {
}
