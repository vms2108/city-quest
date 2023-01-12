import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { CITIES_MAP } from 'src/app/common/constants/cities.map';
import { QuestShort } from 'src/app/common/models/quest-short';
import { StorageService } from 'src/app/common/services/storage.service';
import { GetCommonQuestsFromServer } from 'src/app/store/actions/quest.actions';
import { selectCommon } from 'src/app/store/selectors/admin.selector';
import { CommonState } from 'src/app/store/states/common.state';

@Component({
  selector: 'cq-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityComponent implements OnInit, OnDestroy {

  public list: QuestShort[] = [];

  public label = '';

  public state = this.store.pipe(select(selectCommon));

  private city = '';

  private readonly CITIES_MAP = CITIES_MAP;

  private readonly destroy = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly store: Store<CommonState>,
    private readonly storageService: StorageService,
  ) { }

  public ngOnInit(): void {
    this.readGetParams();
    this.subscriptionStore();
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  public getProgressByQuest(quest: QuestShort): number {
    const data = this.storageService.getData(quest._id);
    return data ? +data : 1;
  }

  public goToQuest(item: QuestShort): void {
    this.router.navigate([`${ this.router.url }/${ item.link }`]);
  }

  private readGetParams(): void {
    const city = this.route.snapshot.paramMap.get('city') || '';
    if (!city || !this.CITIES_MAP.has(city)) {
      this.router.navigate(['']);
      return;
    }

    this.city = city;
    this.setLabel(city);

    this.route.params
      .pipe(takeUntil(this.destroy))
      .subscribe(data => data['city'] ? this.setLabel(data['city']) : '');
  }

  private setLabel(city: string): void {
    this.label = this.CITIES_MAP.get(city);
    this.changeDetectorRef.markForCheck();
  }

  private subscriptionStore(): void {
    this.state
    .pipe(
      tap(data => {
        if (!data || !data.quest.list.length) {
          this.store.dispatch(new GetCommonQuestsFromServer());
          return;
        }
      }),
      takeUntil(this.destroy),
      filter(data => !!data && !!data.quest.list.length),
      map(data => {
        this.list = data!.quest.list!.filter(item => item.city === this.city);
        this.changeDetectorRef.markForCheck();
      }),
    )
    .subscribe();
  }

}
