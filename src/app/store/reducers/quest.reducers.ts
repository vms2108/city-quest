import { CommonQuestState, initialCommonQuestState } from '../states/quest.state';

import { EQuestActions, QuestActions } from './../actions/quest.actions';

export const questReducers = (
  state = initialCommonQuestState,
  action: QuestActions,
): CommonQuestState => {
  switch (action.type) {
    case EQuestActions.UpdateCommonQuestsList: {
      return {
        ...state,
        list: action.payload,
      };
    }

    case EQuestActions.AddFullQuest: {
      return {
        ...state,
        fullList: [...state.fullList, action.payload],
      };
    }

    default : return state;
  }
};
