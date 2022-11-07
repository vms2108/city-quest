import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

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
    AppRoutingModule,
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
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule {}
