import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError, tap } from 'rxjs/operators';
import * as AdminActions from './admin.actions';
import { QuestService } from '../services/quest.service';
import { ScreenService } from '../services/screen.service';
import { BlockService } from '../services/block.service';
import { CityService } from '../services/city.service';
import { NotificationService } from 'src/app/ui/notifications/notification.service';

@Injectable()
export class AdminEffects {
  constructor(
    private actions$: Actions,
    private questService: QuestService,
    private screenService: ScreenService,
    private blockService: BlockService,
    private cityService: CityService,
    private notificationService: NotificationService
  ) {}

  public refreshQuestsAfterSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        AdminActions.createQuestSuccess,
        AdminActions.updateQuestSuccess
      ),
      map(() => AdminActions.loadQuests())
    )
  );

  public loadQuests$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.loadQuests),
      mergeMap(() =>
        this.questService.getAllQuests().pipe(
          map(quests => AdminActions.loadQuestsSuccess({ quests })),
          catchError(() => of({ type: '[Admin] Load Quests Failed' }))
        )
      )
    )
  );

  public loadScreens$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.loadScreens),
      mergeMap(() =>
        this.screenService.getAllScreens().pipe(
          map(screens => AdminActions.loadScreensSuccess({ screens })),
          catchError(() => of({ type: '[Admin] Load Screens Failed' }))
        )
      )
    )
  );

  public loadBlocks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.loadBlocks),
      mergeMap(() =>
        this.blockService.getAllBlocks().pipe(
          map(blocks => AdminActions.loadBlocksSuccess({ blocks })),
          catchError(() => of({ type: '[Admin] Load Blocks Failed' }))
        )
      )
    )
  );

  public loadCities$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.loadCities),
      mergeMap(() =>
        this.cityService.getAllCities().pipe(
          map(cities => AdminActions.loadCitiesSuccess({ cities })),
          catchError(() => of({ type: '[Admin] Load Cities Failed' }))
        )
      )
    )
  );

  public createQuest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.createQuest),
      mergeMap(action =>
        this.questService.createQuest(action.quest).pipe(
          map(quest => AdminActions.createQuestSuccess({ quest })),
          tap(() => this.notificationService.success('Квест успешно создан.')),
          catchError(() => of({ type: '[Admin] Create Quest Failed' }))
        )
      )
    )
  );
  
  public updateQuest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.updateQuest),
      mergeMap(action =>
        this.questService.updateQuest(action.id, action.quest).pipe(
          map(quest => AdminActions.updateQuestSuccess({ quest })),
          tap(() => this.notificationService.success('Квест успешно обновлён.')),
          catchError(() => of({ type: '[Admin] Update Quest Failed' }))
        )
      )
    )
  );

  public deleteQuest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.deleteQuest),
      mergeMap(action =>
        this.questService.deleteQuest(action.id).pipe(
          map(() => AdminActions.deleteQuestSuccess({ id: action.id })),
          catchError(() => of({ type: '[Admin] Delete Quest Failed' }))
        )
      )
    )
  );

  public createScreen$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.createScreen),
      mergeMap(action =>
        this.screenService.createScreen(action.title, action.blocks, action.button_text, action.parameters).pipe(
          map(screen => AdminActions.createScreenSuccess({ screen })),
          catchError(() => of({ type: '[Admin] Create Screen Failed' }))
        )
      )
    )
  );

  public updateScreen$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.updateScreen),
      mergeMap(action =>
        this.screenService.updateScreen(action.screen).pipe(
          map(screen => AdminActions.updateScreenSuccess({ screen })),
          catchError(() => of({ type: '[Admin] Update Screen Failed' }))
        )
      )
    )
  );

  public deleteScreen$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.deleteScreen),
      mergeMap(action =>
        this.screenService.deleteScreen(action.id).pipe(
          map(() => AdminActions.deleteScreenSuccess({ id: action.id })),
          catchError(() => of({ type: '[Admin] Delete Screen Failed' }))
        )
      )
    )
  );

  public createBlock$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.createBlock),
      mergeMap(action =>
        this.blockService.createBlock(action.block).pipe(
          map(block => AdminActions.createBlockSuccess({ block })),
          tap(() => this.notificationService.success('Блок успешно создан')),
          catchError((error) => {
            this.notificationService.error('Ошибка при создании блока: ', error.message);
            return of({ type: '[Admin] Create Block Failed' });
          })
        )
      )
    )
  );

  public updateBlock$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.updateBlock),
      mergeMap(action =>
        this.blockService.updateBlock(action.block).pipe(
          map(block => AdminActions.updateBlockSuccess({ block })),
          tap(() => this.notificationService.success('Блок успешно обновлён')),
          catchError((error) => {
            this.notificationService.error('Ошибка при обновлении блока: ', error.message);
            return of({ type: '[Admin] Update Block Failed' });
          })
        )
      )
    )
  );

  public deleteBlock$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.deleteBlock),
      mergeMap(action =>
        this.blockService.deleteBlock(action.id).pipe(
          map(() => AdminActions.deleteBlockSuccess({ id: action.id })),
          catchError(() => of({ type: '[Admin] Delete Block Failed' }))
        )
      )
    )
  );

  public createCity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.createCity),
      mergeMap(action =>
        this.cityService.createCity(action.city).pipe(
          map(city => AdminActions.createCitySuccess({ city })),
          catchError(() => of({ type: '[Admin] Create City Failed' }))
        )
      )
    )
  );

  public deleteCity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.deleteCity),
      mergeMap(action =>
        this.cityService.deleteCity(action.id).pipe(
          map(() => AdminActions.deleteCitySuccess({ id: action.id })),
          catchError(() => of({ type: '[Admin] Delete City Failed' }))
        )
      )
    )
  );

  public updateCity$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AdminActions.updateCity),
      mergeMap(action =>
        this.cityService.updateCity(action.id, action.city).pipe(
          map(city => AdminActions.updateCitySuccess({ city })),
          tap(() => this.notificationService.success('Город успешно обновлён.')),
          catchError(() => of({ type: '[Admin] Update City Failed' }))
        )
      )
    )
  );

  public refreshBlocksAfterSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        AdminActions.createBlockSuccess,
        AdminActions.updateBlockSuccess,
        AdminActions.deleteBlockSuccess
      ),
      map(() => AdminActions.loadBlocks())
    )
  );
}