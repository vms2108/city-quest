
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ScreenService } from 'src/app/common/data/screen/screen.service';
import { QuestScreen } from 'src/app/common/models/quest-screen';

import { EScreenActions, GetScreensFromServer, UpdateScreensList } from '../actions/screen.actions';

@Injectable()
export class ScreenEffects {
  public updateScreens = createEffect(() => {
    return this.actions.pipe(
      ofType<GetScreensFromServer>(EScreenActions.GetScreensFromServer),
      switchMap(() => this.screenService.loadList()),
      switchMap((screens: QuestScreen[]) => {
        return of(new UpdateScreensList(screens));
      }),
    );
  });

  constructor(
    private readonly screenService: ScreenService,
    private readonly actions: Actions,
  ) {}
}
