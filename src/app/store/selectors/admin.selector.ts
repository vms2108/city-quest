import { createSelector } from '@ngrx/store';

import { CommonState } from '../states/common.state';

const commonState = (state: CommonState) => state;

export const selectCommon = createSelector(
  commonState,
  (state: CommonState) => state ? state : null,
);
