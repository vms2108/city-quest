/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminBlockComponent } from './admin-block.component';

describe('AdminBlockComponent', () => {
  let component: AdminBlockComponent;
  let fixture: ComponentFixture<AdminBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
