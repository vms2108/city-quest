import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQuestComponent } from './admin-quest.component';

describe('AdminQuestComponent', () => {
  let component: AdminQuestComponent;
  let fixture: ComponentFixture<AdminQuestComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [
        AdminQuestComponent,
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
