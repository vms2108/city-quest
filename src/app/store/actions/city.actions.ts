import { Action } from '@ngrx/store';
import { City } from 'src/app/common/interfaces/city.interface';

export enum ECityActions {
  GetCitiesFromServer = '[City] Get Cities From Server',
  UpdateCitiesList = '[City] Update Cities List',
}

export class GetCitiesFromServer implements Action {
  public readonly type = ECityActions.GetCitiesFromServer;
}

export class UpdateCitiesList implements Action {
  public readonly type = ECityActions.UpdateCitiesList;
  constructor(public payload: City[]) {}
}

export type CityActions = GetCitiesFromServer | UpdateCitiesList;
