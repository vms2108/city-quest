import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { CITIES_MAP } from 'src/app/common/constants/cities.map';
import { QuestService } from 'src/app/common/data/quest/quest.service';
import { Quest } from 'src/app/common/models/quest';
import { StorageService } from 'src/app/common/services/storage.service';
import { AddFullQuest } from 'src/app/store/actions/quest.actions';
import { selectCommon } from 'src/app/store/selectors/admin.selector';
import { CommonState } from 'src/app/store/states/common.state';

import { QuestScreen } from '../../common/models/quest-screen';

@Component({
  selector: 'cq-quest',
  templateUrl: './quest.component.html',
  styleUrls: ['./quest.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestComponent implements OnInit, OnDestroy {

  public quest!: Quest;

  public currentScreen!: QuestScreen;

  public move = false;

  public index = 0;

  public link = '';

  private state = this.store.pipe(select(selectCommon));

  private readonly CITIES_MAP = CITIES_MAP;

  private readonly destroy = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly questService: QuestService,
    private readonly storageService: StorageService,
    private readonly store: Store<CommonState>,
  ) { }

  public ngOnInit(): void {
    this.readGetParams();
    this.subscriptionStore();
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  public openScreen(item: QuestScreen): void {
    this.move = true;
    this.changeDetectorRef.markForCheck();
    setTimeout(() => this.selectScreen(item), 400);
  }

  private selectScreen(item: QuestScreen): void {
    this.currentScreen = item;
    this.changeDetectorRef.markForCheck();
  }

  private getScreen(): void {
    const data = this.storageService.getData(this.quest._id);
    if (!data) {
      this.selectScreen(this.quest.items[0]);
    } else {
      this.selectScreen(this.quest.items[+data]);
      this.index = +data;
    }
  }

  private readGetParams(): void {
    const quest = this.route.snapshot.paramMap.get('quest') || '';

    if (!quest) {
      this.navigateThrow();
    }

    this.link = quest;
  }

  private loadQuest(): void {
    this.questService.getFullQuestByLink(this.link)
      .pipe(
        takeUntil(this.destroy),
      )
      .subscribe(info => {
        info ? this.getQuestAndScreen(info) : this.navigateThrow();
        this.store.dispatch(new AddFullQuest(info));
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

  private subscriptionStore(): void {
    this.state
    .pipe(
      takeUntil(this.destroy),
      map(data => {
        const quest = data!.quest.fullList.find(item => this.link === item.link)!;
        quest ? this.getQuestAndScreen(quest) : this.loadQuest();
        this.changeDetectorRef.markForCheck();
      }),
    )
    .subscribe();
  }

  private getQuestAndScreen(quest: Quest): void {
    this.quest = quest;
    this.getScreen();
    this.changeDetectorRef.markForCheck();
  }
}
