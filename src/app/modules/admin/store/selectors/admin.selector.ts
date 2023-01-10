import { createFeatureSelector, createSelector } from '@ngrx/store';

import { AdminState } from '../states/admin.state';

export const selectAdminFeature = createFeatureSelector<AdminState>('admin');

export const selectAdminData = createSelector(selectAdminFeature, (state: AdminState) => state);
