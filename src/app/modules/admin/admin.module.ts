import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminScreenComponent } from './components/screen/admin-screen.component';
import { AdminQuestComponent } from './components/quest/admin-quest.component';
import { adminReducer } from './store/admin.reducer';
import { AdminEffects } from './store/admin.effects';
import { AdminQuestService } from './services/admin-quest.service';
import { AdminScreenService } from './services/admin-screen.service';
import { AdminBlockService } from './services/admin-block.service';
import { AdminCityService } from './services/admin-city.service';
import { AdminMenuComponent } from './components/menu/admin-menu.component';
import { ScreenEditorComponent } from './components/screen/editor/screen-editor.component';
// import { QuestEditorComponent } from './components/quest/editor/quest-editor.component';
import { AdminBlockComponent } from './components/block/admin-block.component';
import { AdminCityComponent } from './components/city/admin-city.component';
import { ADMIN_CONTROL_COMPONENTS } from './controls/admin-control.components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArrayControlModule } from 'src/app/ui/controls/array-control/array-control.module';
import { SelectControlModule } from 'src/app/ui/controls/select-control/select-control.module';
import { SelectSearchControlModule } from 'src/app/ui/controls/select-search-control/select.search-control.module';
import { BasicDialogsModule } from 'src/app/ui/dialogs/basic-dialogs/basic-dialogs.module';
import { TextControlModule } from 'src/app/ui/controls/text-control/text-control.module';
import { AdminBlockEditorComponent } from './components/block/editor/admin-block-editor.component';
import { TextareaControlModule } from 'src/app/ui/controls/textarea-control/textarea-control.module';
import { FileControlModule } from 'src/app/ui/controls/file-control/file-control.module';
import { QuestEditorComponent } from './components/quest/editor/quest-editor.component';
import { CheckboxControlModule } from 'src/app/ui/controls/checkbox-control/checkbox-control.module';
import { NumberControlModule } from 'src/app/ui/controls/number-control/number-control.module';
import { AdminCityEditorComponent } from './components/city/admin-city-editor/admin-city-editor.component';
import { FormFieldsModule } from 'src/app/ui/form-fields/form-fields.module';
import { ScreenCommonModule } from 'src/app/ui/screens/screen-common/screen-common.component';
import { AdminScreenExampleComponent } from './components/screen/example/admin-screen-example.component';
import { LazyLoadingScreenModule } from 'src/app/ui/lazy-loading/lazy-loading-screen.module';
import { AdminBlockExampleComponent } from './components/block/example/admin-block-example.component';

const ADMIN_COMPONENTS = [
  AdminComponent,
  AdminQuestComponent,
  AdminScreenComponent,
  AdminBlockComponent,
  AdminCityComponent,
  AdminMenuComponent
];

const EDITOR_COMPONENTS = [
  ScreenEditorComponent,
  AdminBlockEditorComponent,
  QuestEditorComponent,
  AdminCityEditorComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    StoreModule.forFeature('admin', adminReducer),
    EffectsModule.forFeature([AdminEffects]),
    ReactiveFormsModule,
    FormsModule,
    ArrayControlModule,
    SelectControlModule,
    SelectSearchControlModule,
    BasicDialogsModule,
    TextControlModule,
    TextareaControlModule,
    FileControlModule,
    CheckboxControlModule,
    NumberControlModule,
    FormFieldsModule,
    ScreenCommonModule,
    LazyLoadingScreenModule,
  ],
  declarations: [
    AdminComponent,
    ...ADMIN_CONTROL_COMPONENTS,
    ...ADMIN_COMPONENTS,
    ...EDITOR_COMPONENTS,
    AdminScreenExampleComponent,
    AdminBlockExampleComponent,
  ],
  
  providers: [
    AdminQuestService,
    AdminScreenService,
    AdminBlockService,
    AdminCityService
  ],
  exports: [AdminComponent]
})
export class AdminModule { }