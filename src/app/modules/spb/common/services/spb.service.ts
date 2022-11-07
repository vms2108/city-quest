import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { API_URL_GATEWAY } from 'src/app/api-service.config';
import { QuestShort } from 'src/app/common/models/quest-short';

import { SPB_QUESTS } from './../constants/spb-quests';

@Injectable()
export class SpbService {

  private readonly SPB_QUESTS = SPB_QUESTS;

  constructor(
    private httpClient: HttpClient,
    @Inject(API_URL_GATEWAY) private api: string,
  ) {}

  // сделать передачу хидеров на уровне универсального обработчика запросов
  public loadList(): Observable<QuestShort[]> {
    return of(this.SPB_QUESTS).pipe(delay(500));
    return this.httpClient
      .get<{ payload: QuestShort[] }>(`${ this.api }/onboarding/booking/ab_tests`)
      .pipe(
        map(json => json.payload),
      );
  }
}
