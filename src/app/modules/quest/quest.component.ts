import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, SimpleChange, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CITIES_MAP } from 'src/app/common/constants/cities.map';
import { Quest } from 'src/app/common/models/quest';

import { QuestScreen } from '../../common/models/quest-screen';

import { LazyLoadingScreenService } from './common/lazy-loading-screen.service';
import { QuestService } from './common/quest.service';

@Component({
  selector: 'cq-quest',
  templateUrl: './quest.component.html',
  styleUrls: ['./quest.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestComponent implements OnInit, OnDestroy {

  @ViewChild('currentContainer', { read: ViewContainerRef })
  public currentContainer!: ViewContainerRef;

  @ViewChild('nextContainer', { read: ViewContainerRef })
  public nextContainer!: ViewContainerRef;

  public quest!: Quest;

  public currentScreen!: QuestScreen;

  public move = false;

  private index = 0;

  private readonly CITIES_MAP = CITIES_MAP;

  private readonly destroy = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly questService: QuestService,
    private readonly lazyLoadingScreenService: LazyLoadingScreenService,
    private readonly viewContainerRef: ViewContainerRef,
  ) { }

  public ngOnInit(): void {
    this.readGetParams();
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  public openScreen(item: QuestScreen): void {
    this.move = true;
    this.changeDetectorRef.markForCheck();
    this.lazyLoadCurrentCard(item);
    setTimeout(() => this.stopMove(), 400);
  }

  private readGetParams(): void {
    const quest = this.route.snapshot.paramMap.get('quest') || '';

    if (!quest) {
      this.navigateThrow();
    }

    this.loadQuest(quest);
  }

  private loadQuest(quest: string): void {
    this.questService.loadQuest(quest)
      .pipe(
        takeUntil(this.destroy),
      )
      .subscribe(info => {
        if (info) {
          this.quest = info;
          this.changeDetectorRef.markForCheck();
        } else {
          this.navigateThrow();
        }
      });
  }

  private navigateThrow(): void {
    const city = this.route.snapshot.paramMap.get('city') || '';

    if (city) {
      this.router.navigate([`${ city }`]);
      return;
    }

    if (!city || !this.CITIES_MAP.has(city)) {
      this.router.navigate(['']);
      return;
    }
  }

  private async lazyLoadCurrentCard(screen: QuestScreen): Promise<void> {
    if (this.currentContainer) {
      this.currentContainer.clear();
    }

    const quizCardFactory = await this.lazyLoadingScreenService.getComponentByScreen(screen);
    this.currentScreen = screen;
    this.changeDetectorRef.markForCheck();
    this.viewContainerRef.createComponent(quizCardFactory);
    const { instance } = this.currentContainer.createComponent(quizCardFactory);
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
