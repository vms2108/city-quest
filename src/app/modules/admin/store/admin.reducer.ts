import { createReducer, on } from '@ngrx/store';
import { Quest } from 'src/app/common/interfaces/quest.interface';
import { Screen } from 'src/app/common/interfaces/screen.interface';
import { Block } from 'src/app/common/interfaces/block.interface';
import { City } from 'src/app/common/interfaces/city.interface';
import * as AdminActions from './admin.actions';

export interface AdminState {
  quests: Quest[];
  screens: Screen[];
  blocks: Block[];
  cities: City[];
  lastAction?: string; // Новое поле для отслеживания последнего действия
}

export const initialState: AdminState = {
  quests: [],
  screens: [],
  blocks: [],
  cities: [],
  lastAction: undefined,
};

export const adminReducer = createReducer(
  initialState,
  on(AdminActions.loadQuestsSuccess, (state, { quests }) => ({ ...state, quests, lastAction: AdminActions.loadQuestsSuccess.type })),
  on(AdminActions.loadScreensSuccess, (state, { screens }) => ({ ...state, screens, lastAction: AdminActions.loadScreensSuccess.type })),
  on(AdminActions.loadBlocksSuccess, (state, { blocks }) => ({ ...state, blocks, lastAction: AdminActions.loadBlocksSuccess.type })),
  on(AdminActions.loadCitiesSuccess, (state, { cities }) => ({ ...state, cities, lastAction: AdminActions.loadCitiesSuccess.type })),
  on(AdminActions.createQuestSuccess, (state, { quest }) => ({
    ...state,
    quests: [...state.quests, quest], // Добавляем новый квест в массив
    lastAction: AdminActions.createQuestSuccess.type,
  })),
  on(AdminActions.updateScreenSuccess, (state, { screen }) => ({
    ...state,
    screens: state.screens.map(s => (s.id === screen.id ? screen : s)),
    lastAction: AdminActions.updateScreenSuccess.type,
  })),
  on(AdminActions.createScreenSuccess, (state, { screen }) => ({
    ...state,
    screens: [...state.screens, screen],
    lastAction: AdminActions.createScreenSuccess.type,
  })),
  on(AdminActions.createBlockSuccess, (state, { block }) => ({ ...state, blocks: [...state.blocks, block], lastAction: AdminActions.createBlockSuccess.type })),
  on(AdminActions.createCitySuccess, (state, { city }) => ({ ...state, cities: [...state.cities, city], lastAction: AdminActions.createCitySuccess.type })),
  on(AdminActions.deleteQuestSuccess, (state, { id }) => ({
    ...state,
    quests: state.quests.filter(quest => quest.id !== id),
    lastAction: AdminActions.deleteQuestSuccess.type,
  })),
  on(AdminActions.deleteScreenSuccess, (state, { id }) => ({
    ...state,
    screens: state.screens.filter(screen => screen.id !== id),
    lastAction: AdminActions.deleteScreenSuccess.type,
  })),
  on(AdminActions.deleteBlockSuccess, (state, { id }) => ({
    ...state,
    blocks: state.blocks.filter(block => block.id !== id),
    lastAction: AdminActions.deleteBlockSuccess.type,
  })),
  on(AdminActions.deleteCitySuccess, (state, { id }) => ({
    ...state,
    cities: state.cities.filter(city => city.id !== id),
    lastAction: AdminActions.deleteCitySuccess.type,
  })),
  on(AdminActions.updateCitySuccess, (state, { city }) => ({
    ...state,
    cities: state.cities.map(c => (c.id === city.id ? city : c)),
    lastAction: AdminActions.updateCitySuccess.type,
  })),
  on(AdminActions.updateScreenSuccess, (state, { screen }) => ({
    ...state,
    screens: state.screens.map(s => (s.id === screen.id ? screen : s)),
    lastAction: AdminActions.updateScreenSuccess.type,
  })),
  on(AdminActions.updateBlockSuccess, (state, { block }) => ({
    ...state,
    blocks: state.blocks.map(b => (b.id === block.id ? block : b)),
    lastAction: AdminActions.updateBlockSuccess.type,
  }))
);
