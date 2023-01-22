import { InjectionToken, Provider } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { QuestService } from 'src/app/common/data/quest/quest.service';
import { Quest } from 'src/app/common/models/quest';

export const QUEST_INFO = new InjectionToken<Observable<Quest>>(
  'A stream with current organization information',
);

export const QUEST_PROVIDERS: Provider[] = [
  {
    provide: QUEST_INFO,
    deps: [ActivatedRoute, QuestService],
    // deps позволяет взять из дерева DI необходимые сущности и передать их
    // как аргументы в фабрику значения токена.
    // В них можно получить любую сущность из DI, в том числе и с использованием DI-декораторов
    useFactory: organizationFactory,
  },
];

export function organizationFactory(
  { params }: ActivatedRoute,
  questService: QuestService,
): Observable<Quest> {
  return params.pipe(
    switchMap(params => {
      const link = params['quest'];
      return questService.getFullQuestByLink(link);
    }),
  );
}
