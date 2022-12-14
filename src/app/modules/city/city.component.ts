import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CITIES_MAP } from 'src/app/common/constants/cities.map';
import { QuestShort } from 'src/app/common/models/quest-short';

import { CityService } from './common/city.service';

@Component({
  selector: 'cq-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityComponent implements OnInit, OnDestroy {

  public list!: Observable<QuestShort[]>;

  public label = '';

  private readonly CITIES_MAP = CITIES_MAP;

  private readonly destroy = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly cityService: CityService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) { }

  public ngOnInit(): void {
    this.readGetParams();
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  public goToQuest(item: QuestShort): void {
    this.router.navigate([`${ this.router.url }/${ item._id }`]);
  }

  private readGetParams(): void {
    const city = this.route.snapshot.paramMap.get('city') || '';
    if (!city || !this.CITIES_MAP.has(city)) {
      this.router.navigate(['']);
      return;
    }

    this.listAndLabel(city);

    this.route.params
      .pipe(takeUntil(this.destroy))
      .subscribe(data => data['city'] ? this.listAndLabel(data['city']) : '');
  }

  private listAndLabel(city: string): void {
    this.loadList(city);
    this.setLabel(city);
  }

  private loadList(city: string): void {
    this.list = this.cityService.loadList(city);
  }

  private setLabel(city: string): void {
    this.label = this.CITIES_MAP.get(city);
    this.changeDetectorRef.markForCheck();
  }

}
