import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { City } from 'src/app/common/interfaces/city.interface';
import { loadCities, deleteCity } from '../../store/admin.actions';
import { selectCities } from '../../store/admin.selectors';
import { Column } from 'src/app/common/models/column';
import { BasicDialogsService } from 'src/app/ui/dialogs/basic-dialogs/basic-dialogs.service';
import { NotificationService } from 'src/app/ui/notifications/notification.service';
import { CommonState } from 'src/app/store/states/common.state';

@Component({
  selector: 'cq-admin-city',
  templateUrl: './admin-city.component.html',
  styleUrls: ['./admin-city.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminCityComponent implements OnInit, OnDestroy {
  public cities$: Observable<City[]>;

  public displayedColumns = [
    new Column('name', 'Название'),
    new Column('quests', 'Квесты'),
  ];

  public loading = true;

  public selectedItem: City | null = null;

  public visibleEditor = false;

  public isCopy = false;

  private destroy = new Subject<void>();

  private editableId: string | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly basicDialogsService: BasicDialogsService,
    private readonly notificationService: NotificationService,
    private readonly store: Store<CommonState>
  ) {
    this.cities$ = this.store.select(selectCities);
  }

  public ngOnInit(): void {
    this.readGetParams();
    this.store.dispatch(loadCities());
    this.cities$
      .pipe(
        filter(cities => cities.length > 0),
        takeUntil(this.destroy)
      )
      .subscribe(() => {
        this.setLoading(false);
        this.setUpdatedItem();
      });
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  public closeEditor(): void {
    this.visibleEditor = false;
    this.editableId = null;
    this.selectedItem = null;
    this.changeDetectorRef.markForCheck();
  }

  public selectCity(item: City | null, isCopy = false): void {
    this.isCopy = isCopy;
    this.selectedItem = item;
    if (!isCopy && item) {
      this.editableId = item.id.toString();
    }
    this.visibleEditor = true;
    this.changeDetectorRef.markForCheck();
  }

  public deleteCity(city: City): void {
    this.confirmDelete(city)
      .pipe(filter(confirmed => confirmed))
      .subscribe(() => this.removeCity(city));
  }

  public upsertCity(updatedCity: City): void {
    this.setLoading(true);
    this.closeEditor();
  }

  private removeCity(city: City): void {
    this.setLoading(true);
    this.store.dispatch(deleteCity({ id: city.id }));
    this.notificationService.success('Успешно удалено');
    this.setLoading(false);
  }

  private readGetParams(): void {
    this.editableId = this.route.snapshot.paramMap.get('id');
  }

  private setUpdatedItem(): void {
    if (this.editableId && !this.selectedItem) {
      this.cities$.subscribe(cities => {
        this.selectedItem = cities.find(item => item.id.toString() === this.editableId) || null;
        if (this.selectedItem) {
          this.visibleEditor = true;
          this.changeDetectorRef.markForCheck();
        }
      });
    }
  }

  private confirmDelete(city: City): Observable<boolean> {
    return this.basicDialogsService.confirm(`Вы действительно хотите удалить город ${city.name}?`);
  }

  private setLoading(loading: boolean): void {
    this.loading = loading;
    this.changeDetectorRef.markForCheck();
  }
}
