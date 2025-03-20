import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { API_URL_GATEWAY } from 'src/app/api-service.config';
import { ImageService } from 'src/app/common/data/image/image.service';
import { BasicDialogsModule } from 'src/app/ui/dialogs/basic-dialogs/basic-dialogs.module';
import { LoaderWithBackdropModule } from 'src/app/ui/loader-with-backdrop/loader-with-backdrop.module';
import { NotificationModule } from 'src/app/ui/notifications/notification.module';
import { environment } from 'src/environments/environment';

import { initialAdminState } from './../store/states/admin.state';
import { AdminImageComponent } from './admin-image.component';

describe('AdminImageComponent', () => {
  let component: AdminImageComponent;
  let fixture: ComponentFixture<AdminImageComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [
        BasicDialogsModule,
        NotificationModule,
        LoaderWithBackdropModule,
      ],
      declarations: [
        AdminImageComponent,
      ],
      providers: [
        ImageService,
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
    fixture = TestBed.createComponent(AdminImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
