import { BLOCK_DISTRIBUTION_COMPONENTS } from 'src/app/ui/constructor-distribution/block-distribution.types';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, NgModule, OnChanges, Output, SimpleChange, SimpleChanges, ViewChild, ViewContainerRef } from '@angular/core';
import { InnerHtmlModule } from 'src/app/ui/safe-html/inner-html.module';
import { ScreenBtnModule } from 'src/app/ui/screen-btn/screen-btn.module';
import { BlockDistributionService } from 'src/app/ui/constructor-distribution/block-distribution.service';
import { Screen } from 'src/app/common/interfaces/screen.interface';
import { Block } from 'src/app/common/interfaces/block.interface';

@Component({
  selector: 'cq-screen-subjects',
  templateUrl: './screen-subjects.component.html',
  styleUrls: ['./screen-subjects.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    BlockDistributionService,
  ],
})
export class ScreenSubjectsComponent implements OnChanges {

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

  public activeSubject = '';

  public wrongAnswer = false;

  private praisePhrases: string[] = [
    'Отлично сделано!',
    'Молодец!',
    'Великолепно!',
    'Ты на высоте!',
    'Прекрасно!',
    "Супер, это верный ответ!",
    "Точно в цель!",
  ];

  private errorPhrases: string[] = [
    "Попробуйте ещё раз",
    "Не совсем так, давай ещё попытку",
    "Неа. Попробуй снова",
    "Давай ещё разок",
    "Пробуй ещё!",
    "Может другой выбрать?",
    "Попыток много"
  ];

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly blockDistributionService: BlockDistributionService,
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.container) {
      this.container.clear();
    }

    if (this.screen.blocks) {
      this.lazyLoadBlock(this.screen.blocks, 0);
    }
  }

  public apply(): void {
    this.goNext.emit('');
  }

  public subjectClick(answer: string): void {
    this.activeSubject = answer;
    this.wrongAnswer = answer !== this.screen.parameters!.rightAnswer;
    this.changeDetectorRef.markForCheck();
  }

  public getRandomPraise(): string {
    const randomIndex = Math.floor(Math.random() * this.praisePhrases.length);
    return this.praisePhrases[randomIndex];
  }

  public getRandomError(): string {
    const randomIndex = Math.floor(Math.random() * this.errorPhrases.length);
    return this.errorPhrases[randomIndex];
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
    ScreenSubjectsComponent,
  ],
  exports: [
    ScreenSubjectsComponent,
  ]
})
export class ScreenCommonModule {
}
