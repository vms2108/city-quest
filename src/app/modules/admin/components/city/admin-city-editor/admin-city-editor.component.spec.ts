/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AdminCityEditorComponent } from './admin-city-editor.component';

describe('AdminCityEditorComponent', () => {
  let component: AdminCityEditorComponent;
  let fixture: ComponentFixture<AdminCityEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCityEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCityEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
