
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { QuestService } from 'src/app/common/data/quest/quest.service';
import { QuestShort } from 'src/app/common/models/quest-short';

import { EQuestActions, GetCommonQuestsFromServer, UpdateCommonQuestsList } from '../actions/quest.actions';

@Injectable()
export class CommonQuestEffects {
  public updateQuests = createEffect(() => {
    return this.actions.pipe(
      ofType<GetCommonQuestsFromServer>(EQuestActions.GetCommonQuestsFromServer),
      switchMap(() => this.questService.loadList()),
      switchMap((quests: QuestShort[]) => {
        return of(new UpdateCommonQuestsList(quests));
      }),
    );
  });

  constructor(
    private readonly questService: QuestService,
    private readonly actions: Actions,
  ) {}
}
