/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminBlockEditorComponent } from './admin-block-editor.component';

describe('AdminBlockEditorComponent', () => {
  let component: AdminBlockEditorComponent;
  let fixture: ComponentFixture<AdminBlockEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBlockEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBlockEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
