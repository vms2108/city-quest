import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { API_URL_GATEWAY } from 'src/app/api-service.config';
import { QuestShort } from 'src/app/common/models/quest-short';

import { ALL_QUESTS } from './constants/all-quests';

@Injectable()
export class CityService {

  private readonly ALL_QUESTS = ALL_QUESTS;

  constructor(
    private httpClient: HttpClient,
    @Inject(API_URL_GATEWAY) private api: string,
  ) {}

  // сделать передачу хидеров на уровне универсального обработчика запросов
  public loadList(type: string): Observable<QuestShort[]> {
    return of(this.mockLoadByType(type)).pipe(delay(500));
    return this.httpClient
      .get<{ payload: QuestShort[] }>(`${ this.api }/city/${ type }`)
      .pipe(
        map(json => json.payload),
      );
  }

  private mockLoadByType(type: string): QuestShort[] {
    return this.ALL_QUESTS.filter(item => item.city === type);
  }
}
