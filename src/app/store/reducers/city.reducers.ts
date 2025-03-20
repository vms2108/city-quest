import { CityActions, ECityActions } from '../actions/city.actions';
import { City } from 'src/app/common/interfaces/city.interface';

export function cityReducer(
  state: City[] = [],
  action: CityActions
): City[] {
  switch (action.type) {
    case ECityActions.UpdateCitiesList:
      return action.payload;

    default:
      return state;
  }
}
