import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';

import { DialogContainerBasicComponent } from './dialog-container-basic.component';

@Component({
  template: `
    <cq-dialog-container-basic
      dialogTitle="test title"
    >
      <ng-template #contentSection>
        <div class="test-content-section"></div>
      </ng-template>

      <ng-template #actionButton>
        <div class="test-action-button"></div>
      </ng-template>

      <ng-template #actionButton>
        <div class="test-action-button"></div>
      </ng-template>

      <ng-template #actionButton>
        <div class="test-action-button"></div>
      </ng-template>
    </cq-dialog-container-basic>
  `,
})
class TestWrapComponent {
  @ViewChild(DialogContainerBasicComponent, { static: true })
  public dialogContainerBasicComponent!: DialogContainerBasicComponent;
}

describe('DialogContainerBasicComponent', () => {
  let wrapComponent!: TestWrapComponent;
  let wrapFixture!: ComponentFixture<TestWrapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatListModule,
        MatDialogModule,
      ],
      declarations: [
        DialogContainerBasicComponent,
        TestWrapComponent,
      ],
    }).compileComponents();

    wrapFixture = TestBed.createComponent(TestWrapComponent);
    wrapComponent = wrapFixture.debugElement.componentInstance;
  }));

  it('should create the component', () => {
    expect(wrapComponent.dialogContainerBasicComponent).toBeTruthy();
  });

  it('should set title', () => {
    wrapComponent.dialogContainerBasicComponent.dialogTitle = 'test title';
    wrapFixture.detectChanges();
    const testTitleEl = wrapFixture.nativeElement.querySelector('.title');
    expect(testTitleEl.textContent.trim()).toBe('test title');
  });

  it('should display template "contentSection"', () => {
    wrapFixture.detectChanges();
    const contentSectionEl = wrapFixture.nativeElement.querySelector('.content-section');
    const testContentSectionEl = contentSectionEl.querySelector('.test-content-section');
    expect(!!testContentSectionEl).toBeTruthy();
  });

  it('should display templates "actionButton"', () => {
    wrapFixture.detectChanges();
    const actionsEl = wrapFixture.nativeElement.querySelector('.actions');
    const testActionEls = actionsEl.querySelectorAll('.test-action-button');
    expect(testActionEls.length).toBe(3);
  });

});
