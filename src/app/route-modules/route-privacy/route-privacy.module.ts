import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PrivacyModule } from 'src/app/modules/privacy/privacy.module';

import { RoutePrivacyComponent } from './route-privacy.component';

@NgModule({
  imports: [
    CommonModule,
    PrivacyModule,
  ],
  declarations: [RoutePrivacyComponent],
})
export class RoutePrivacyModule { }
