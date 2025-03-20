import { HttpClient } from '@angular/common/http';
/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LazyLoadingScreenService } from 'src/app/ui/lazy-loading/lazy-loading-screen.service';

import { QuestHeaderComponent } from '../header/quest-header.component';

import { QuestScreenComponent } from './quest-screen.component';

describe('QuestScreenComponent', () => {
  let component: QuestScreenComponent;
  let fixture: ComponentFixture<QuestScreenComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [
        QuestScreenComponent,
        QuestHeaderComponent,
      ],
      providers: [
        LazyLoadingScreenService,
        HttpClient,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
