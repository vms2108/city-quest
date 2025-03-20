import { createAction, props } from '@ngrx/store';
import { Quest } from 'src/app/common/interfaces/quest.interface';
import { Screen } from 'src/app/common/interfaces/screen.interface';
import { Block } from 'src/app/common/interfaces/block.interface';
import { City } from 'src/app/common/interfaces/city.interface';

export const loadQuests = createAction('[Admin] Load Quests');
export const loadQuestsSuccess = createAction('[Admin] Load Quests Success', props<{ quests: Quest[] }>());
export const loadScreens = createAction('[Admin] Load Screens');
export const loadScreensSuccess = createAction('[Admin] Load Screens Success', props<{ screens: Screen[] }>());
export const loadBlocks = createAction('[Admin] Load Blocks');
export const loadBlocksSuccess = createAction('[Admin] Load Blocks Success', props<{ blocks: Block[] }>());
export const loadCities = createAction('[Admin] Load Cities');
export const loadCitiesSuccess = createAction('[Admin] Load Cities Success', props<{ cities: City[] }>());

export const createQuest = createAction(
  '[Admin] Create Quest',
  props<{ quest: Omit<Quest, 'id' | 'created_at' | 'updated_at'> }>()
);
export const createQuestSuccess = createAction(
  '[Admin] Create Quest Success',
  props<{ quest: Quest }>()
);

export const updateQuest = createAction(
  '[Admin] Update Quest',
  props<{ id: string; quest: Omit<Quest, 'id' | 'created_at' | 'updated_at'> }>()
);
export const updateQuestSuccess = createAction(
  '[Admin] Update Quest Success',
  props<{ quest: Quest }>()
);
export const deleteQuest = createAction('[Admin] Delete Quest', props<{ id: string }>());
export const deleteQuestSuccess = createAction('[Admin] Delete Quest Success', props<{ id: string }>());

export const createScreen = createAction(
  '[Admin] Create Screen',
  props<{
    title: string;
    blocks: { block_id: string; order: number }[];
    button_text: string;
    parameters: Record<string, any>;
    screenType: string; // Изменено на screenType
  }>()
);
export const createScreenSuccess = createAction('[Admin] Create Screen Success', props<{ screen: Screen }>());
export const updateScreen = createAction('[Admin] Update Screen', props<{ screen: Screen }>());
export const updateScreenSuccess = createAction('[Admin] Update Screen Success', props<{ screen: Screen }>());
export const deleteScreen = createAction('[Admin] Delete Screen', props<{ id: string }>());
export const deleteScreenSuccess = createAction('[Admin] Delete Screen Success', props<{ id: string }>());

export const createBlock = createAction('[Admin] Create Block', props<{ block: FormData }>());
export const createBlockSuccess = createAction('[Admin] Create Block Success', props<{ block: Block }>());
export const updateBlock = createAction('[Admin] Update Block', props<{ block: FormData }>());
export const updateBlockSuccess = createAction('[Admin] Update Block Success', props<{ block: Block }>());
export const deleteBlock = createAction('[Admin] Delete Block', props<{ id: string }>());
export const deleteBlockSuccess = createAction('[Admin] Delete Block Success', props<{ id: string }>());

export const createCity = createAction('[Admin] Create City', props<{ city: Omit<City, 'id' | 'quests' | 'created_at' | 'updated_at'> }>());
export const createCitySuccess = createAction('[Admin] Create City Success', props<{ city: City }>());
export const deleteCity = createAction('[Admin] Delete City', props<{ id: string }>());
export const deleteCitySuccess = createAction('[Admin] Delete City Success', props<{ id: string }>());
export const updateCity = createAction(
  '[Admin] Update City',
  props<{ id: string; city: Omit<City, 'id' | 'quests' | 'created_at' | 'updated_at'> }>()
);
export const updateCitySuccess = createAction(
  '[Admin] Update City Success',
  props<{ city: City }>()
);