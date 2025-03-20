import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { QuestService } from 'src/app/common/data/quest/quest.service';
import { ECityActions, GetCitiesFromServer, UpdateCitiesList } from '../actions/city.actions';
import { City } from 'src/app/common/interfaces/city.interface';

@Injectable()
export class CityEffects {
  public updateCities = createEffect(() => {
    return this.actions.pipe(
      ofType<GetCitiesFromServer>(ECityActions.GetCitiesFromServer),
      switchMap(() => this.questService.getCities()),
      switchMap((cities: City[]) => {
        return of(new UpdateCitiesList(cities));
      }),
    );
  });

  constructor(
    private readonly questService: QuestService,
    private readonly actions: Actions,
  ) {}
}
