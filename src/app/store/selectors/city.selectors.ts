import { createSelector } from '@ngrx/store';
import { CommonState } from '../states/common.state';

const commonState = (state: CommonState) => state;

export const selectCities = createSelector(
  commonState,
  (state: CommonState) => state.cities
);
