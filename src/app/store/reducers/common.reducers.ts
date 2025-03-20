import { ActionReducerMap } from '@ngrx/store';
import { CommonState } from '../states/common.state';
import { questReducers } from './quest.reducers';
import { adminReducer } from 'src/app/modules/admin/store/admin.reducer';
import { cityReducer } from './city.reducers';

export const commonReducers: ActionReducerMap<CommonState, any> = {
  quest: questReducers,
  admin: adminReducer,
  cities: cityReducer,
};