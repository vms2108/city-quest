import { Quest } from 'src/app/common/interfaces/quest.interface';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, SimpleChange, ViewChild, ViewContainerRef } from '@angular/core';
import { Screen } from 'src/app/common/interfaces/screen.interface';
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
  public currentScreen!: Screen;

  @Input()
  public index = 0;

  @ViewChild('currentContainer', { read: ViewContainerRef })
  public currentContainer!: ViewContainerRef;

  @ViewChild('nextContainer', { read: ViewContainerRef })
  public nextContainer!: ViewContainerRef;

  public nextScreen!: Screen;

  public move = true;

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly lazyLoadingScreenService: LazyLoadingScreenService,
    private readonly footerService: FooterService,
    private readonly headerService: HeaderService,
    private readonly storageService: StorageService,
  ) { }

  public ngOnChanges(): void {
    if (!!this.quest) {
      this.getScreen();
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

    if (this.index) {
      setTimeout(() => this.stopMovePrev(), 400);
    }
    this.changeMove(true);
    this.changeDetectorRef.markForCheck();
  }

  private getScreen(): void {
    const data = this.storageService.getData(this.quest.id);
    if (!data) {
      this.selectScreen(this.quest.screens![0]);
    } else {
      this.selectScreen(this.quest.screens![+data]);
      this.index = +data;
    }
  }

  private selectScreen(item: Screen): void {
    this.currentScreen = item;
    this.changeDetectorRef.markForCheck();
  }

  private openScreen(item: Screen): void {
    this.changeMove(true);
    this.lazyLoadCurrentCard(item);
    setTimeout(() => this.changeMove(false), 400);
    this.changeDetectorRef.markForCheck();
  }

  private async lazyLoadCurrentCard(screen: Screen): Promise<void> {
    const quizCardFactory = await this.lazyLoadingScreenService.getComponentByScreen(screen);
    this.currentScreen = screen;
    this.changeDetectorRef.markForCheck();
    const newComponent = this.currentContainer.createComponent<ALLCOMPONENTS>(quizCardFactory);
    if (this.currentContainer) {
      this.currentContainer.detach(0);
      this.currentContainer.insert(newComponent.hostView, 0);
    }
    newComponent.instance.screen = screen;
    newComponent.instance.goNext.subscribe(() => {
      this.next();
    });
    (newComponent.instance as any).ngOnChanges([new SimpleChange(null, screen, true)]);
    if (this.quest.screens!.length > this.index + 1) {
      this.nextScreen = this.quest.screens![this.index + 1];
      this.lazyLoadNextCard();
    }
  }

  private async lazyLoadNextCard(): Promise<void> {
    const quizCardFactory = await this.lazyLoadingScreenService.getComponentByScreen(this.nextScreen);
    const nextComponent = this.nextContainer.createComponent<ALLCOMPONENTS>(quizCardFactory);
    if (this.nextContainer) {
      this.nextContainer.detach(0);
      this.nextContainer.insert(nextComponent.hostView, 0);
    }
    nextComponent.instance.screen = this.nextScreen;
    (nextComponent.instance as any).ngOnChanges([new SimpleChange(null, this.nextScreen, true)]);
  }

  private next(): void {
    if (this.move || !this.currentScreen) {
      return;
    }

    if (this.quest.screens!.length > this.index + 1) {
      this.nextScreen = this.quest.screens![this.index + 1];
      this.changeMove(true);
      setTimeout(() => this.stopMoveNext(), 400);
    }
  }

  private stopMoveNext(): void {
    this.currentScreen = this.nextScreen;
    this.index ++;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.lazyLoadCurrentCard(this.currentScreen);
    this.saveData();
    this.changeMove(false);
  }

  private stopMovePrev(): void {
    this.currentScreen = this.quest.screens![this.index - 1];
    this.index --;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.lazyLoadCurrentCard(this.currentScreen);
    this.saveData();
    this.changeMove(false);
  }

  private saveData(): void {
    this.storageService.saveData(this.quest.id, this.index.toString());
  }

  private changeMove(move: boolean): void {
    this.move = move;
    this.changeDetectorRef.markForCheck();
  }
}
