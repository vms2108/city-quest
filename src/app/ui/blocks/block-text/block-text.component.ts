import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgModule, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { InnerHtmlModule } from 'src/app/ui/safe-html/inner-html.module';

@Component({
  selector: 'cq-block-text',
  templateUrl: './block-text.component.html',
  styleUrls: ['./block-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockTextComponent implements OnInit, OnDestroy, OnChanges {

  @Input()
  public block!: any;

  @Input()
  public current!: boolean;

  @Output()
  public selectAnswer = new EventEmitter<string>();


  constructor(
  ) { }

  public ngOnInit(): void {
  }

  public ngOnDestroy(): void {
  }

  public ngOnChanges(changes: SimpleChanges): void {
  }

  
}

@NgModule({
  imports: [
    CommonModule,
    InnerHtmlModule,
  ],
  declarations: [
    BlockTextComponent,
  ],
  exports: [
    BlockTextComponent,
  ],
})
export class BlockTitleModule {
}
