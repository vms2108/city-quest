import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, NgModule, OnChanges, Output, SimpleChanges } from '@angular/core';
import { QuestScreen } from 'src/app/common/models/quest-screen';
import { BlocksModule } from 'src/app/ui/blocks/blocks.module';
import { InnerHtmlModule } from 'src/app/ui/safe-html/inner-html.module';
import { ScreenBtnModule } from 'src/app/ui/screen-btn/screen-btn.module';

@Component({
  selector: 'cq-screen-info',
  templateUrl: './screen-info.component.html',
  styleUrls: ['./screen-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenInfoComponent implements OnChanges {

  @Input()
  public screen!: QuestScreen;

  @Input()
  public fromAdmin = false;

  @Output()
  public goNext = new EventEmitter<string>();

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    this.screen = changes[0].currentValue;
    this.changeDetectorRef.markForCheck();
  }

  public apply(): void {
    this.goNext.emit('');
  }

}

@NgModule({
  imports: [
    CommonModule,
    InnerHtmlModule,
    BlocksModule,
    ScreenBtnModule,
  ],
  declarations: [
    ScreenInfoComponent,
  ],
})
export class ScreenInfoModule {
}
