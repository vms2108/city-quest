import { createSelector } from '@ngrx/store';
import { AdminState } from './admin.reducer';

export const selectAdminState = (state: { admin: AdminState }) => state.admin;

export const selectQuests = createSelector(selectAdminState, (state: AdminState) => state.quests);
export const selectScreens = createSelector(selectAdminState, (state: AdminState) => state.screens);
export const selectBlocks = createSelector(selectAdminState, (state: AdminState) => state.blocks);
export const selectCities = createSelector(selectAdminState, (state: AdminState) => state.cities);
