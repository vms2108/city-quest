/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminQuestComponent } from './admin-quest.component';

describe('AdminQuestComponent', () => {
  let component: AdminQuestComponent;
  let fixture: ComponentFixture<AdminQuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminQuestComponent ]
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
