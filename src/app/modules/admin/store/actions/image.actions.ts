import { Action } from '@ngrx/store';
import { ScreenImage } from 'src/app/common/models/screen-image';

export enum EImageActions {
  GetImagesFromServer = '[Image] Get Image From Server',
  UpdateImagesList = '[Image] Update Images List',
}

export class GetImagesFromServer implements Action {
  public readonly type = EImageActions.GetImagesFromServer;
}

export class UpdateImagesList implements Action {
  public readonly type = EImageActions.UpdateImagesList;
  constructor(public payload: ScreenImage[]) {
  }
}

export type ImageActions = GetImagesFromServer | UpdateImagesList;
