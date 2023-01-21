/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestScreenComponent } from './quest-screen.component';

describe('QuestScreenComponent', () => {
  let component: QuestScreenComponent;
  let fixture: ComponentFixture<QuestScreenComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [
        QuestScreenComponent,
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
