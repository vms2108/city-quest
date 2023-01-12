import { Quest } from 'src/app/common/models/quest';
import { QuestShort } from 'src/app/common/models/quest-short';

export interface CommonQuestState {
  list: QuestShort[];
  fullList: Quest[];
}

export const initialCommonQuestState: CommonQuestState = {
  list: [],
  fullList: [],
};
