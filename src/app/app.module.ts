import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, HammerGestureConfig, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { environment } from 'src/environments/environment';

import { API_URL_GATEWAY } from './api-service.config';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiErrorsInterceptor } from './common/api-errors/api-errors.interceptor';
import { TokenInterceptor } from './common/interceptor/token.interceptor';
import { FooterComponent } from './root-components/footer/footer.component';
import { HeaderComponent } from './root-components/header/header.component';
import { NotificationModule } from './ui/notifications/notification.module';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    HammerModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    NotificationModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
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
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiErrorsInterceptor,
      multi: true,
    },
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {}
