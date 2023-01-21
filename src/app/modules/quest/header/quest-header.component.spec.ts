import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestHeaderComponent } from './quest-header.component';

describe('QuestHeaderComponent', () => {
  let component: QuestHeaderComponent;
  let fixture: ComponentFixture<QuestHeaderComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [
        QuestHeaderComponent,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
