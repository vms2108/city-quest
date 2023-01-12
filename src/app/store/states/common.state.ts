import { CommonQuestState, initialCommonQuestState } from './quest.state';

export interface CommonState {
  quest: CommonQuestState;
}

export const initialCommonAdminState: CommonState = {
  quest: initialCommonQuestState,
};

export function getInitialState(): CommonState {
  return initialCommonAdminState;
}
