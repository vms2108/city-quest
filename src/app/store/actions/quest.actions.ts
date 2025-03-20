import { Action } from '@ngrx/store';
import { Quest } from 'src/app/common/interfaces/quest.interface';

export enum EQuestActions {
  GetCommonQuestsFromServer = '[Quest] Get Quest From Server',
  UpdateCommonQuestsList = '[Quest] Update Quests List',
  AddFullQuest = '[Quest] Add Full Quest',
}

export class GetCommonQuestsFromServer implements Action {
  public readonly type = EQuestActions.GetCommonQuestsFromServer;
}

export class UpdateCommonQuestsList implements Action {
  public readonly type = EQuestActions.UpdateCommonQuestsList;
  constructor(public payload: Quest[]) {
  }
}

export class AddFullQuest implements Action {
  public readonly type = EQuestActions.AddFullQuest;
  constructor(public payload: Quest) {
  }
}

export type QuestActions = GetCommonQuestsFromServer | UpdateCommonQuestsList | AddFullQuest;
