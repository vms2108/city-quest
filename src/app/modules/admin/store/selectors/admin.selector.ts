import { createFeatureSelector, createSelector } from '@ngrx/store';

import { CommonAdminState } from '../states/admin.state';

export const selectAdminFeature = createFeatureSelector<CommonAdminState, CommonAdminState>('admin');

export const selectAdminData = createSelector(selectAdminFeature, (state: CommonAdminState) => state.admin);
