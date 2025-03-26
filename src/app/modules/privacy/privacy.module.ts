import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivacyComponent } from './privacy.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    PrivacyComponent,
  ],
  exports: [
    PrivacyComponent,
  ]
})
export class PrivacyModule { }
