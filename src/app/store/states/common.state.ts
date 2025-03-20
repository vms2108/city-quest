import { City } from 'src/app/common/interfaces/city.interface';
import { CommonQuestState, initialCommonQuestState } from './quest.state';
import { AdminState } from 'src/app/modules/admin/store/admin.reducer';

// Расширяем CommonState, добавляя admin
export interface CommonState {
  quest: CommonQuestState; // Существующее состояние квестов
  admin: AdminState;       // Состояние админки
  cities: City[];
}

export const initialCommonAdminState: CommonState = {
  quest: initialCommonQuestState,
  admin: {                 // Начальное состояние админки
    quests: [],
    screens: [],
    blocks: [],
    cities: []
  },
  cities: [],
};

export function getInitialState(): CommonState {
  return initialCommonAdminState;
}