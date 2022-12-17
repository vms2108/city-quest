import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, SimpleChange, ViewChild, ViewContainerRef } from '@angular/core';
import { Quest } from 'src/app/common/models/quest';
import { QuestScreen } from 'src/app/common/models/quest-screen';
import { FooterService } from 'src/app/root-components/footer/footer.service';
import { HeaderService } from 'src/app/root-components/header/header.service';

import { ALLCOMPONENTS, LazyLoadingScreenService } from '../common/lazy-loading-screen.service';

@Component({
  selector: 'cq-quest-screen',
  templateUrl: './quest-screen.component.html',
  styleUrls: ['./quest-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestScreenComponent implements OnChanges, OnDestroy {

  @Input()
  public quest!: Quest;

  @Input()
  public currentScreen!: QuestScreen;

  @ViewChild('currentContainer', { read: ViewContainerRef })
  public currentContainer!: ViewContainerRef;

  @ViewChild('nextContainer', { read: ViewContainerRef })
  public nextContainer!: ViewContainerRef;

  public nextScreen!: QuestScreen;

  public move = false;

  private index = 0;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly lazyLoadingScreenService: LazyLoadingScreenService,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly footerService: FooterService,
    private readonly headerService: HeaderService,
  ) { }

  public ngOnChanges(): void {
    if (!!this.currentScreen) {
      this.openScreen(this.currentScreen);
      this.footerService.changeVisible(false);
      this.headerService.changeVisibleBurger(false);
    }
  }

  public ngOnDestroy(): void {
    this.footerService.changeVisible(true);
    this.headerService.changeVisibleBurger(true);
  }

  private openScreen(item: QuestScreen): void {
    this.move = true;

    this.lazyLoadCurrentCard(item);
    setTimeout(() => this.stopMove(), 400);
    this.changeDetectorRef.markForCheck();
  }

  private async lazyLoadCurrentCard(screen: QuestScreen): Promise<void> {
    if (this.currentContainer) {
      this.currentContainer.clear();
    }

    const quizCardFactory = await this.lazyLoadingScreenService.getComponentByScreen(screen);
    this.currentScreen = screen;
    this.changeDetectorRef.markForCheck();
    this.viewContainerRef.createComponent<ALLCOMPONENTS>(quizCardFactory);
    const { instance } = this.currentContainer.createComponent<ALLCOMPONENTS>(quizCardFactory);
    instance.screen = screen;
    instance.goNext ? instance.goNext.subscribe(() => {
      this.next();
    }) : '';
    (instance as any).ngOnChanges([new SimpleChange(null, screen, true)]);
    if (this.quest.items.length > this.index + 1) {
      // this.nextScreen = this.onboarding.screens[this.index + 1].info;
      // this.lazyLoadNextCard();
    }
  }

  private next(): void {

  }

  private stopMove(): void {
    this.move = false;
    this.changeDetectorRef.markForCheck();
  }

}
