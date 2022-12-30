import { ActionReducerMap } from '@ngrx/store';

import { AdminState } from '../states/admin.state';

import { imageReducers } from './image.reducers';
import { questReducers } from './quest.reducers';
import { screenReducers } from './screen.reducers';

export const adminReducers: ActionReducerMap<AdminState, any> = {
  image: imageReducers,
  screen: screenReducers,
  quest: questReducers,
};
