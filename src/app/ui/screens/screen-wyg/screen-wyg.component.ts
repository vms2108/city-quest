import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgModule, OnChanges, Output, SimpleChanges } from '@angular/core';
import { InnerHtmlModule } from 'src/app/ui/safe-html/inner-html.module';
import { Screen } from 'src/app/common/interfaces/screen.interface';
import { ScreensCountModule } from 'src/app/ui/screens-count/screens-count.module';

@Component({
  selector: 'cq-screen-wyg',
  templateUrl: './screen-wyg.component.html',
  styleUrls: ['./screen-wyg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenWygComponent implements OnChanges {

  @Input()
  public screen!: Screen;

  @Input()
  public fromAdmin = false;

  @Input()
  public current = false;

  @Output()
  public goNext = new EventEmitter<string>();

  constructor(
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    console.log(this.screen);
  }

  public apply(): void {
    this.goNext.emit('');
  }
}

@NgModule({
  imports: [
    CommonModule,
    InnerHtmlModule,
    ScreensCountModule,
  ],
  declarations: [
    ScreenWygComponent,
  ],
  exports: [
    ScreenWygComponent,
  ]
})
export class ScreenWygModule {
}
