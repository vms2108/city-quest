import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, NgModule, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuestScreen } from 'src/app/common/models/quest-screen';
import { BlocksModule } from 'src/app/ui/blocks/blocks.module';
import { TextControlModule } from 'src/app/ui/controls/text-control/text-control.module';
import { NotificationModule } from 'src/app/ui/notifications/notification.module';
import { NotificationService } from 'src/app/ui/notifications/notification.service';
import { InnerHtmlModule } from 'src/app/ui/safe-html/inner-html.module';
import { ScreenBtnModule } from 'src/app/ui/screen-btn/screen-btn.module';

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

  public answerControl = new FormControl('', [Validators.required]);

  public blockPromptVisible = false;

  public promptVisible = false;

  public prompt = '';

  public needAnswer = false;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly notificationService: NotificationService,
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    this.screen = changes[0].currentValue;
    this.prompt = this.screen!.parameters.help;
    this.changeDetectorRef.markForCheck();
  }

  public apply(): void {
    const rightAnswers = this.screen!.parameters.answers.map(item => item.toLowerCase());
    const userAnswer = this.answerControl.value!.toLowerCase();
    if (rightAnswers.indexOf(userAnswer) !== -1) {
      this.success();
    } else {
      this.fail();
    }
  }

  public needPrompt(): void {
    this.promptVisible = true;
    this.blockPromptVisible = false;
    this.changeDetectorRef.markForCheck();
  }

  public help(): void {
    const answer = this.screen!.parameters.answers[0];
    this.answerControl.setValue(answer);
  }

  private fail(): void {
    if (!this.blockPromptVisible && !this.promptVisible) {
      this.blockPromptVisible = true;
    }

    if (this.promptVisible) {
      this.needAnswer = true;
      this.notificationService.warning('Это фиаско');
    } else {
      this.notificationService.warning('Не получилось, не фортануло');
    }

    this.changeDetectorRef.markForCheck();
  }

  private success(): void {
    this.notificationService.success('Правильно!');
    setTimeout(() => this.goNext.emit(''), 300);
  }

}

@NgModule({
  imports: [
    CommonModule,
    InnerHtmlModule,
    BlocksModule,
    TextControlModule,
    ReactiveFormsModule,
    NotificationModule,
    ScreenBtnModule,
  ],
  declarations: [
    ScreenQuestionFreeComponent,
  ],
})
export class ScreenQuestionFreeModule {
}
