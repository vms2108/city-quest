import { QuestShort } from 'src/app/common/models/quest-short';

export interface QuestState {
  list: QuestShort[] | null;
}

export const initialQuestState: QuestState = {
  list: null,
};
