import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ImageModule } from 'src/app/common/data/image/image.module';
import { QuestModule } from 'src/app/common/data/quest/quest.module';
import { ScreenModule } from 'src/app/common/data/screen/screen.module';
import { ArrayControlModule } from 'src/app/ui/controls/array-control/array-control.module';
import { FileControlModule } from 'src/app/ui/controls/file-control/file-control.module';
import { SelectControlModule } from 'src/app/ui/controls/select-control/select-control.module';
import { TextControlModule } from 'src/app/ui/controls/text-control/text-control.module';
import { TextareaControlModule } from 'src/app/ui/controls/textarea-control/textarea-control.module';
import { BasicDialogsModule } from 'src/app/ui/dialogs/basic-dialogs/basic-dialogs.module';
import { LazyLoadingScreenModule } from 'src/app/ui/lazy-loading/lazy-loading-screen.module';
import { LoaderWithBackdropModule } from 'src/app/ui/loader-with-backdrop/loader-with-backdrop.module';
import { environment } from 'src/environments/environment';

import { AdminComponent } from './admin.component';
import { ADMIN_CONTROL_COMPONENTS } from './controls/admin-control.components';
import { AdminImageComponent } from './image/admin-image.component';
import { ImageEditorComponent } from './image/editor/image-editor.component';
import { OfferMenuComponent } from './menu/admin-menu.component';
import { AdminQuestComponent } from './quest/admin-quest.component';
import { AdminScreenComponent } from './screen/admin-screen.component';
import { ScreenEditorComponent } from './screen/editor/screen-editor.component';
import { ImageEffects } from './store/effects/image.effects';
import { QuestEffects } from './store/effects/quest.effects';
import { ScreenEffects } from './store/effects/screen.effects';
import { adminReducers } from './store/reducers/admin.reducers';

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
    ImageModule,
    ScreenModule,
    QuestModule,
    MatIconModule,
    LazyLoadingScreenModule,
    StoreModule.forFeature('admin', adminReducers),
    EffectsModule.forFeature([
      ImageEffects,
      QuestEffects,
      ScreenEffects,
    ]),
    StoreRouterConnectingModule.forRoot({ stateKey : 'router' }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  declarations: [
    AdminComponent,
    OfferMenuComponent,
    AdminScreenComponent,
    AdminQuestComponent,
    ScreenEditorComponent,
    AdminImageComponent,
    ImageEditorComponent,
    ADMIN_CONTROL_COMPONENTS,
  ],
  exports: [
    AdminComponent,
  ],
})
export class AdminModule { }
