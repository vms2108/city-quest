/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SelectSearchControlComponent } from './select-search-control.component';

describe('SelectSearchControlComponent', () => {
  let component: SelectSearchControlComponent;
  let fixture: ComponentFixture<SelectSearchControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectSearchControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSearchControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
