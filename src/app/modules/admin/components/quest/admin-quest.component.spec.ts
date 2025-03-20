import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { API_URL_GATEWAY } from 'src/app/api-service.config';
import { QuestService } from 'src/app/common/data/quest/quest.service';
import { initialCommonAdminState } from 'src/app/store/states/common.state';
import { BasicDialogsModule } from 'src/app/ui/dialogs/basic-dialogs/basic-dialogs.module';
import { LoaderWithBackdropModule } from 'src/app/ui/loader-with-backdrop/loader-with-backdrop.module';
import { NotificationModule } from 'src/app/ui/notifications/notification.module';
import { environment } from 'src/environments/environment';

import { AdminQuestComponent } from './admin-quest.component';

const PARAM_MAP = convertToParamMap({ id: '' });

const fakeActivatedRoute = {
  snapshot: { paramMap: PARAM_MAP },
} as ActivatedRoute;

describe('AdminQuestComponent', () => {
  let component: AdminQuestComponent;
  let fixture: ComponentFixture<AdminQuestComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      imports: [
        BasicDialogsModule,
        NotificationModule,
        LoaderWithBackdropModule,
      ],
      declarations: [
        AdminQuestComponent,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        QuestService,
        HttpClient,
        HttpHandler,
        {
          provide: API_URL_GATEWAY,
          useValue: environment.gateway,
        },
        provideMockStore({ initialState: initialCommonAdminState  }),
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminQuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
