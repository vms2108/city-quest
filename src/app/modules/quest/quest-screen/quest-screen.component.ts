import { Quest } from 'src/app/common/interfaces/quest.interface';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, SimpleChange, ViewChild, ViewContainerRef } from '@angular/core';
import { Screen } from 'src/app/common/interfaces/screen.interface';
import { StorageService } from 'src/app/common/services/storage.service';
import { FooterService } from 'src/app/root-components/footer/footer.service';
import { HeaderService } from 'src/app/root-components/header/header.service';
import { ALLCOMPONENTS, LazyLoadingScreenService } from 'src/app/ui/lazy-loading/lazy-loading-screen.service';
import { AuthService } from 'src/app/common/auth/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { TitleService } from 'src/app/common/services/title.service';
import { BlockTypeEnum } from 'src/app/ui/constructor-distribution/enums/block-type.enum';
import { AnalyticService } from 'src/app/common/services/analytic.service';

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

  public showRatingModal = false;

  private destroy = new Subject<void>();

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly lazyLoadingScreenService: LazyLoadingScreenService,
    private readonly footerService: FooterService,
    private readonly headerService: HeaderService,
    private readonly storageService: StorageService,
    private readonly authService: AuthService,
    private readonly titleService: TitleService,
    private readonly analyticService: AnalyticService,
  ) { }

  public ngOnChanges(): void {
    if (!!this.quest) {
      this.getScreen();
      this.footerService.changeVisible(false);
      this.headerService.changeVisible(false);
      this.titleService.setTitle(this.quest.description!);
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

  public goBackVisible(): boolean {
    return !!this.index && this.currentScreen.type !== 'pay' && this.currentScreen.type !== 'email' && this.currentScreen.type !== 'wyg';
  }

  public onRatingSubmitted(rating: number): void {
    this.sendMusicRating(rating);
    this.onModalClosed();
  }

  public onModalClosed(): void {
    this.showRatingModal = false;
    this.changeDetectorRef.markForCheck();
    this.next();
  }

  private sendMusicRating(rating: number): void {
    const blockId = this.currentScreen!.blocks!.find(item => item.type === BlockTypeEnum.AUDIO)!.id;
    this.analyticService
      .saveMusicRating(blockId, rating)
      .pipe(
        takeUntil(this.destroy)
      )
      .subscribe();
  }

  private getScreen(): void {
    const data = this.storageService.getData(this.quest.id);
    if (!data) {
      console.log(this.quest);
      this.selectScreen(this.quest.screens![0]);
    } else {
      const index = this.findExistIndex(+data);
      if (this.quest.screens![index].type === 'pay') {
        this.checkTokenAndRefresh(index);
      } else {
        this.goToScreen(index);
      }
    }
  }

  private findExistIndex(index: number): number {
    return !!this.quest.screens![index] ? index : this.findExistIndex(index - 1);
  }

  private checkTokenAndRefresh(index: number): void {
    this.authService
      .getTokenAndRefresh()
      .pipe(takeUntil(this.destroy))
      .subscribe(answer => {
        if (answer) {
          this.goToScreen(index);
        } else {
          const emailIndex = this.quest.screens!.findIndex(screen => screen.type === 'email');
          this.goToScreen(emailIndex);
        }
      })
  }

  private goToScreen(index: number): void {
    this.selectScreen(this.quest.screens![index]);
    this.index = index;
  }

  private selectScreen(item: Screen): void {
    this.currentScreen = item;
    this.openScreen(this.currentScreen);
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
      this.checkMusicAndNext();
    });
    (newComponent.instance as any).ngOnChanges([new SimpleChange(null, screen, true)]);
    this.saveData();
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

  private checkMusicAndNext(): void {
    if (this.currentScreen!.blocks && this.currentScreen!.blocks.find(item => item.type === BlockTypeEnum.AUDIO)) {
      this.showRatingModal = true;
      this.changeDetectorRef.markForCheck();
    } else {
      this.next();
    }
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
    this.changeMove(false);
  }

  private stopMovePrev(): void {
    this.currentScreen = this.quest.screens![this.index - 1];
    this.index --;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.lazyLoadCurrentCard(this.currentScreen);
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
