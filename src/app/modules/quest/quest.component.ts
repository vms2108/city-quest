import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CITIES_MAP } from 'src/app/common/constants/cities.map';
import { Quest } from 'src/app/common/models/quest';

import { QuestScreen } from '../../common/models/quest-screen';

import { QuestService } from './common/quest.service';

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

  private readonly CITIES_MAP = CITIES_MAP;

  private readonly destroy = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly questService: QuestService,
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
    setTimeout(() => this.selectScreen(item), 400);
  }

  private selectScreen(item: QuestScreen): void {
    this.currentScreen = item;
    this.changeDetectorRef.markForCheck();
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
}
