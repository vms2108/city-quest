import { ActionReducerMap } from '@ngrx/store';

import { CommonState } from '../states/common.state';

import { questReducers } from './quest.reducers';

export const commonReducers: ActionReducerMap<CommonState, any> = {
  quest: questReducers,
};
