import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { ArrayControlModule } from 'src/app/ui/controls/array-control/array-control.module';
import { FileControlModule } from 'src/app/ui/controls/file-control/file-control.module';
import { SelectControlModule } from 'src/app/ui/controls/select-control/select-control.module';
import { TextControlModule } from 'src/app/ui/controls/text-control/text-control.module';
import { TextareaControlModule } from 'src/app/ui/controls/textarea-control/textarea-control.module';
import { BasicDialogsModule } from 'src/app/ui/dialogs/basic-dialogs/basic-dialogs.module';
import { LoaderWithBackdropModule } from 'src/app/ui/loader-with-backdrop/loader-with-backdrop.module';

import { AdminComponent } from './admin.component';
import { ADMIN_CONTROL_COMPONENTS } from './controls/admin-control.components';
import { OfferMenuComponent } from './menu/admin-menu.component';
import { AdminQuestComponent } from './quest/admin-quest.component';
import { AdminScreenComponent } from './screen/admin-screen.component';
import { AdminScreenService } from './screen/common/admin-screen.service';
import { ScreenEditorComponent } from './screen/editor/screen-editor.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ArrayControlModule,
    TextControlModule,
    ReactiveFormsModule,
    MatIconModule,
    LoaderWithBackdropModule,
    BasicDialogsModule,
    FileControlModule,
    TextareaControlModule,
    SelectControlModule,
  ],
  declarations: [
    AdminComponent,
    OfferMenuComponent,
    AdminScreenComponent,
    AdminQuestComponent,
    ScreenEditorComponent,
    ADMIN_CONTROL_COMPONENTS,
  ],
  providers: [
    AdminScreenService,
  ],
  exports: [
    AdminComponent,
  ],
})
export class AdminModule { }
