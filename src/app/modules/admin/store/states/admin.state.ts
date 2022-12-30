import { ImageState, initialImageState } from './image.state';
import { initialQuestState, QuestState } from './quest.state';
import { initialScreenState, ScreenState } from './screen.state';

export interface CommonAdminState {
  admin: AdminState;
}

export interface AdminState {
  image: ImageState;
  screen: ScreenState;
  quest: QuestState;
}

export const initialAdminState: AdminState = {
  image: initialImageState,
  screen: initialScreenState,
  quest: initialQuestState,
};

export const initialCommonAdminState: CommonAdminState = {
  admin: initialAdminState,
};

export function getInitialState(): CommonAdminState {
  return initialCommonAdminState;
}
