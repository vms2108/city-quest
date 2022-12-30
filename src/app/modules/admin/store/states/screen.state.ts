import { QuestScreen } from 'src/app/common/models/quest-screen';

export interface ScreenState {
  list: QuestScreen[] | null;
}

export const initialScreenState: ScreenState = {
  list: null,
};
