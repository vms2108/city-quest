import { initialQuestState, QuestState } from '../states/quest.state';

import { EQuestActions, QuestActions } from './../actions/quest.actions';

export const questReducers = (
  state = initialQuestState,
  action: QuestActions,
): QuestState => {
  switch (action.type) {
    case EQuestActions.UpdateQuestsList: {
      return {
        ...state,
        list: action.payload,
      };
    }

    default : return state;
  }
};
