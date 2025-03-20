import { NO_ERRORS_SCHEMA } from '@angular/compiler';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { FooterComponent } from './root-components/footer/footer.component';
import { HeaderComponent } from './root-components/header/header.component';
import { NotificationModule } from './ui/notifications/notification.module';

describe('AppComponent', () => {
  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NotificationModule,
      ],
      declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
      ],
      schemas: [
        NO_ERRORS_SCHEMA,
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
