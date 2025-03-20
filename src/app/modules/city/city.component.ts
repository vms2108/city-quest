import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { Quest } from 'src/app/common/interfaces/quest.interface';
import { StorageService } from 'src/app/common/services/storage.service';
import { GetCommonQuestsFromServer } from 'src/app/store/actions/quest.actions';
import { GetCitiesFromServer } from 'src/app/store/actions/city.actions';
import { selectCities } from 'src/app/store/selectors/city.selectors';
import { selectCommon } from 'src/app/store/selectors/admin.selector';
import { CommonState } from 'src/app/store/states/common.state';

@Component({
  selector: 'cq-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityComponent implements OnInit, OnDestroy {
  public list: Quest[] = [];
  public label = '';
  public cities$ = this.store.pipe(select(selectCities));
  public state = this.store.pipe(select(selectCommon));
  private city = '';
  private readonly destroy = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly store: Store<CommonState>,
    private readonly storageService: StorageService,
  ) {}

  public ngOnInit(): void {
    // Явно инициируем загрузку городов
    console.log(0);
    this.store.dispatch(new GetCitiesFromServer());
    this.initializeCitiesAndParams();
    this.subscriptionStore();
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  public getProgressByQuest(quest: Quest): number {
    const data = this.storageService.getData(quest.id);
    return data ? +data : 1;
  }

  public goToQuest(item: Quest): void {
    this.router.navigate([`${this.router.url}/${item.id}`]);
  }

  private initializeCitiesAndParams(): void {
    this.cities$
      .pipe(
        takeUntil(this.destroy),
        filter(cities => cities.length > 0), // Ждем, пока города загрузятся
      )
      .subscribe(cities => {
        console.log('Cities loaded:', cities); // Проверяем, что города пришли
        this.readGetParams(); // Вызываем после загрузки городов
        this.changeDetectorRef.markForCheck();
      });
  }

  private readGetParams(): void {
    console.log(1); // Теперь должно сработать
    const city = this.route.snapshot.paramMap.get('city') || '';
    let cities: { id: string; name: string; link: string }[] = [];
    this.cities$.subscribe(c => (cities = c));
    const validCity = cities.find(c => c.link === city);
    if (!city || !validCity) {
      this.router.navigate(['']);
      return;
    }

    this.city = city;
    this.setLabel(city);
  }

  private setLabel(city: string): void {
    let cities: { id: string; name: string; link: string }[] = [];
    this.cities$.subscribe(c => (cities = c));
    const cityData = cities.find(c => c.link === city);
    this.label = cityData ? cityData.name : '';
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
          console.log(data);
          console.log(this.city);
          this.list = data!.quest.list!.filter(item => item.city_link === this.city);
          console.log(this.list);
          this.changeDetectorRef.markForCheck();
        }),
      )
      .subscribe();
  }
}
