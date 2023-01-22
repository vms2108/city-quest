import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, HammerGestureConfig, HammerModule, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';

import { API_URL_GATEWAY } from './api-service.config';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiErrorsInterceptor } from './common/api-errors/api-errors.interceptor';
import { DataQuestModule } from './common/data/quest/quest.module';
import { TokenInterceptor } from './common/interceptor/token.interceptor';
import { FooterComponent } from './root-components/footer/footer.component';
import { HeaderComponent } from './root-components/header/header.component';
import { ScrolledDirective } from './root-components/header/scrolled.directive';
import { CommonQuestEffects } from './store/effects/quest.effects';
import { commonReducers } from './store/reducers/common.reducers';
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
    StoreModule.forRoot(commonReducers),
    EffectsModule.forRoot([
      CommonQuestEffects,
    ]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument(),
    DataQuestModule,
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ScrolledDirective,
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
