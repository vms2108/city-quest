import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, HammerGestureConfig, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { environment } from './../environments/environment';
import { API_URL_GATEWAY } from './api-service.config';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './root-components/footer/footer.component';
import { HeaderComponent } from './root-components/header/header.component';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    HammerModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
  ],
  providers: [
    {
      provide: API_URL_GATEWAY,
      useValue: environment.gateway,
    },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerGestureConfig,
    },
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {}
