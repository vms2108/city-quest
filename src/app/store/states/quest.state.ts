import { Quest } from "src/app/common/interfaces/quest.interface";

export interface CommonQuestState {
  list: Quest[];
  fullList: Quest[];
}

export const initialCommonQuestState: CommonQuestState = {
  list: [],
  fullList: [],
};
