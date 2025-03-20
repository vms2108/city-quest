import { BLOCK_DISTRIBUTION_COMPONENTS } from 'src/app/ui/constructor-distribution/block-distribution.types';
import { CommonModule } from '@angular/common';
import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, NgModule, OnChanges, Output, SimpleChange, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { InnerHtmlModule } from 'src/app/ui/safe-html/inner-html.module';
import { ScreenBtnModule } from 'src/app/ui/screen-btn/screen-btn.module';
import { BlockDistributionService } from 'src/app/ui/constructor-distribution/block-distribution.service';
import { Screen } from 'src/app/common/interfaces/screen.interface';
import { Block } from 'src/app/common/interfaces/block.interface';

@Component({
  selector: 'cq-screen-common',
  templateUrl: './screen-common.component.html',
  styleUrls: ['./screen-common.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    BlockDistributionService,
  ],
})
export class ScreenCommonComponent implements OnChanges, AfterContentInit, AfterViewInit {

  @Input()
  public screen!: Screen;

  @Input()
  public fromAdmin = false;

  @Input()
  public current = false;

  @Output()
  public goNext = new EventEmitter<string>();

  @ViewChild('container', { read: ViewContainerRef })
  public container!: ViewContainerRef;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly blockDistributionService: BlockDistributionService,
  ) {}

  public ngAfterContentInit(): void {
    if (this.screen.blocks && !this.fromAdmin) {
      this.lazyLoadBlock(this.screen.blocks, 0);
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
  }

  public ngAfterViewInit(): void {
    if (this.fromAdmin && this.screen) {
      if (this.container) {
        this.container.clear();
      }
  
      if (this.screen.blocks) {
        this.lazyLoadBlock(this.screen.blocks, 0);
      }
    }
  }

  public apply(): void {
    this.goNext.emit('');
  }

  private async lazyLoadBlock(blocks: Block[], index: number): Promise<void> {
    if (!blocks[index]) {
      return;
    }
    const block = blocks[index];
    const quizCardFactory = await this.blockDistributionService.getComponentFactory(block.type);
    const newComponent = this.container.createComponent<BLOCK_DISTRIBUTION_COMPONENTS>(quizCardFactory);
    this.container.insert(newComponent.hostView, index);
    newComponent.instance.block = block;
    newComponent.instance.current = this.current;
    newComponent.instance.selectAnswer.subscribe(info => {
      console.log(info)
    });
    (newComponent.instance as any).ngOnChanges([new SimpleChange(null, block, true)]);
    this.lazyLoadBlock(blocks, index + 1);
    this.changeDetectorRef.markForCheck();
  }
}

@NgModule({
  imports: [
    CommonModule,
    InnerHtmlModule,
    ScreenBtnModule,
  ],
  declarations: [
    ScreenCommonComponent,
  ],
  exports: [
    ScreenCommonComponent,
  ]
})
export class ScreenCommonModule {
}
