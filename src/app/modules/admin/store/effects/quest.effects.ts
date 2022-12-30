
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { QuestService } from 'src/app/common/data/quest/quest.service';
import { QuestShort } from 'src/app/common/models/quest-short';

import { EQuestActions, GetQuestsFromServer, UpdateQuestsList } from '../actions/quest.actions';

@Injectable()
export class QuestEffects {
  public updateQuests = createEffect(() => {
    return this.actions.pipe(
      ofType<GetQuestsFromServer>(EQuestActions.GetQuestsFromServer),
      switchMap(() => this.questService.loadList()),
      switchMap((quests: QuestShort[]) => {
        return of(new UpdateQuestsList(quests));
      }),
    );
  });

  constructor(
    private readonly questService: QuestService,
    private readonly actions: Actions,
  ) {}
}
