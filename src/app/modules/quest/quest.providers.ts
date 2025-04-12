import { InjectionToken, Provider } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter, map, merge, Observable, switchMap } from 'rxjs';
import { AuthService } from 'src/app/common/auth/auth.service';
import { QuestService } from 'src/app/common/data/quest/quest.service';
import { Quest } from 'src/app/common/interfaces/quest.interface';

export const QUEST_INFO = new InjectionToken<Observable<Quest>>(
  'A stream with current organization information',
);

export const QUEST_PROVIDERS: Provider[] = [
  {
    provide: QUEST_INFO,
    deps: [ActivatedRoute, QuestService, AuthService],
    useFactory: organizationFactory,
  },
];

export function organizationFactory(
  { params }: ActivatedRoute,
  questService: QuestService,
  authService: AuthService,
): Observable<Quest> {
  return params.pipe(
    switchMap(params => {
      const link = params['quest'];
      // Сначала обновляем токен
      return authService.getTokenAndRefresh().pipe(
        switchMap(() => {
          return merge(
            // Начальная загрузка квеста после обновления токена
            questService.getFullQuestByLink(link),
            // Обновления из questSubject
            questService.getQuestObservable().pipe(
              filter(quest => !!quest && quest.id === link),
              map(quest => quest as Quest)
            )
          );
        })
      );
    })
  );
}
