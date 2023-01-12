import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, SimpleChange, ViewChild, ViewContainerRef } from '@angular/core';
import { Quest } from 'src/app/common/models/quest';
import { QuestScreen } from 'src/app/common/models/quest-screen';
import { StorageService } from 'src/app/common/services/storage.service';
import { FooterService } from 'src/app/root-components/footer/footer.service';
import { HeaderService } from 'src/app/root-components/header/header.service';
import { ALLCOMPONENTS, LazyLoadingScreenService } from 'src/app/ui/lazy-loading/lazy-loading-screen.service';

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

  @Input()
  public index = 0;

  @ViewChild('currentContainer', { read: ViewContainerRef })
  public currentContainer!: ViewContainerRef;

  @ViewChild('nextContainer', { read: ViewContainerRef })
  public nextContainer!: ViewContainerRef;

  public nextScreen!: QuestScreen;

  public move = false;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly lazyLoadingScreenService: LazyLoadingScreenService,
    private readonly footerService: FooterService,
    private readonly headerService: HeaderService,
    private readonly storageService: StorageService,
  ) { }

  public ngOnChanges(): void {
    if (!!this.currentScreen) {
      this.openScreen(this.currentScreen);
      this.footerService.changeVisible(false);
      this.headerService.changeVisible(false);
    }
  }

  public ngOnDestroy(): void {
    this.footerService.changeVisible(true);
    this.headerService.changeVisible(true);
  }

  public prev(): void {
    if (this.move) {
      return;
    }
    this.currentContainer.clear();
    if (this.index) {
      setTimeout(() => this.stopMovePrev(), 400);
    }
    this.move = true;
    this.changeDetectorRef.markForCheck();
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
    const { instance } = this.currentContainer.createComponent<ALLCOMPONENTS>(quizCardFactory);
    instance.screen = screen;
    instance.goNext ? instance.goNext.subscribe(() => {
      this.next();
    }) : '';
    (instance as any).ngOnChanges([new SimpleChange(null, screen, true)]);
    if (this.quest.items.length > this.index + 1) {
      this.nextScreen = this.quest.items[this.index + 1];
      this.lazyLoadNextCard();
    }
  }

  private async lazyLoadNextCard(): Promise<void> {
    if (!this.nextScreen) return;
    const quizCardFactory = await this.lazyLoadingScreenService.getComponentByScreen(this.nextScreen);
    const { instance } = this.nextContainer.createComponent<ALLCOMPONENTS>(quizCardFactory);
    instance.screen = this.nextScreen;
    (instance as any).ngOnChanges([new SimpleChange(null, this.nextScreen, true)]);
  }

  private next(): void {
    if (this.move || !this.currentScreen) {
      return;
    }

    if (this.quest.items.length > this.index + 1) {
      this.currentContainer.clear();
      this.nextContainer.clear();
      this.nextScreen = this.quest.items[this.index + 1];
      this.move = true;
      setTimeout(() => this.stopMoveNext(), 400);
    }
  }

  private stopMoveNext(): void {
    this.currentScreen = this.nextScreen;
    this.index ++;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.lazyLoadCurrentCard(this.currentScreen);
    this.saveData();
    this.stopMove();
  }

  private stopMovePrev(): void {
    this.currentScreen = this.quest.items[this.index - 1];
    this.index --;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.lazyLoadCurrentCard(this.currentScreen);
    this.saveData();
    this.stopMove();
  }

  private saveData(): void {
    this.storageService.saveData(this.quest._id, this.index.toString());
  }

  private stopMove(): void {
    this.move = false;
    this.changeDetectorRef.markForCheck();
  }

}
