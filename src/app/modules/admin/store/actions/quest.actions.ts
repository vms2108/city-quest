import { Action } from '@ngrx/store';
import { QuestShort } from 'src/app/common/models/quest-short';

export enum EQuestActions {
  GetQuestsFromServer = '[Quest] Get Quest From Server',
  UpdateQuestsList = '[Quest] Update Quests List',
}

export class GetQuestsFromServer implements Action {
  public readonly type = EQuestActions.GetQuestsFromServer;
}

export class UpdateQuestsList implements Action {
  public readonly type = EQuestActions.UpdateQuestsList;
  constructor(public payload: QuestShort[]) {
  }
}

export type QuestActions = GetQuestsFromServer | UpdateQuestsList;
