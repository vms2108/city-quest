import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { API_URL_GATEWAY } from 'src/app/api-service.config';
import { ScreenService } from 'src/app/common/data/screen/screen.service';
import { BasicDialogsModule } from 'src/app/ui/dialogs/basic-dialogs/basic-dialogs.module';
import { LoaderWithBackdropModule } from 'src/app/ui/loader-with-backdrop/loader-with-backdrop.module';
import { NotificationModule } from 'src/app/ui/notifications/notification.module';
import { environment } from 'src/environments/environment';

import { initialAdminState } from '../store/states/admin.state';

import { AdminScreenComponent } from './admin-screen.component';

const PARAM_MAP = convertToParamMap({ id: '' });

const fakeActivatedRoute = {
  snapshot: { paramMap: PARAM_MAP },
} as ActivatedRoute;

describe('AdminScreenComponent', () => {
  let component: AdminScreenComponent;
  let fixture: ComponentFixture<AdminScreenComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [
        BasicDialogsModule,
        NotificationModule,
        LoaderWithBackdropModule,
      ],
      declarations: [
        AdminScreenComponent,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        ScreenService,
        HttpClient,
        HttpHandler,
        {
          provide: API_URL_GATEWAY,
          useValue: environment.gateway,
        },
        provideMockStore({ initialState: initialAdminState  }),
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
