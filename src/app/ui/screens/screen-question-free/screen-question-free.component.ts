import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, NgModule, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuestScreen } from 'src/app/common/models/quest-screen';
import { BlocksModule } from 'src/app/ui/blocks/blocks.module';
import { NameControlModule } from 'src/app/ui/controls/name-control/name-control.module';
import { NotificationsModule } from 'src/app/ui/notifications/notifications.module';
import { NotificationsService } from 'src/app/ui/notifications/notifications.service';
import { InnerHtmlModule } from 'src/app/ui/safe-html/inner-html.module';

@Component({
  selector: 'cq-screen-question-free',
  templateUrl: './screen-question-free.component.html',
  styleUrls: ['./screen-question-free.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
  ],
})
export class ScreenQuestionFreeComponent implements OnChanges {

  @Input()
  public screen!: QuestScreen;

  @Output()
  public goNext = new EventEmitter<string>();

  public answerControl = new FormControl(null, [Validators.required]);

  public blockPromptVisible = false;

  public promptVisible = false;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly notificationsService: NotificationsService,
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    this.screen = changes[0].currentValue;
    this.changeDetectorRef.markForCheck();
  }

  public apply(): void {
    if (this.screen!.blocks[this.screen!.blocks.length - 1].answers.indexOf(this.answerControl.value!) !== -1) {
      this.success();
    } else {
      this.fail();
    }
  }

  private fail(): void {
    if (!this.blockPromptVisible) {
      this.blockPromptVisible = true;
    }
    this.notificationsService.warning('Не получилось, не фортануло');
    this.changeDetectorRef.markForCheck();
  }

  private success(): void {
    this.notificationsService.warning('Правильно!');
    setTimeout(() => this.goNext.emit(''), 300);
  }

}

@NgModule({
  imports: [
    CommonModule,
    InnerHtmlModule,
    BlocksModule,
    NameControlModule,
    ReactiveFormsModule,
    NotificationsModule,
  ],
  declarations: [
    ScreenQuestionFreeComponent,
  ],
})
export class ScreenQuestionFreeModule {
}
