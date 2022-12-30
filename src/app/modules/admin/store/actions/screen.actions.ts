import { Action } from '@ngrx/store';
import { QuestScreen } from 'src/app/common/models/quest-screen';

export enum EScreenActions {
  GetScreensFromServer = '[Screen] Get Screen From Server',
  UpdateScreensList = '[Screen] Update Screens List',
}

export class GetScreensFromServer implements Action {
  public readonly type = EScreenActions.GetScreensFromServer;
}

export class UpdateScreensList implements Action {
  public readonly type = EScreenActions.UpdateScreensList;
  constructor(public payload: QuestScreen[]) {
  }
}

export type ScreenActions = GetScreensFromServer | UpdateScreensList;
