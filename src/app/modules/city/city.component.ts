import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CITIES_MAP } from 'src/app/common/constants/cities.map';
import { QuestShort } from 'src/app/common/models/quest-short';

import { CityService } from './common/city.service';

@Component({
  selector: 'cq-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityComponent implements OnInit {

  public list!: Observable<QuestShort[]>;

  public label = '';

  private readonly CITIES_MAP = CITIES_MAP;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly cityService: CityService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) { }

  public ngOnInit(): void {
    this.readGetParams();
  }

  public goToQuest(item: QuestShort): void {
    this.router.navigate([`${ this.router.url }/${ item.id }`]);
  }

  private readGetParams(): void {
    const city = this.route.snapshot.paramMap.get('city') || '';
    if (!city || !this.CITIES_MAP.has(city)) {
      this.router.navigate(['']);
      return;
    }

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
