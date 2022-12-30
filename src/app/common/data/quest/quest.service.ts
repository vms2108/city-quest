import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL_GATEWAY } from 'src/app/api-service.config';
import { Quest } from 'src/app/common/models/quest';
import { QuestShort } from 'src/app/common/models/quest-short';

@Injectable()
export class QuestService {

  constructor(
    private readonly httpClient: HttpClient,
    @Inject(API_URL_GATEWAY) private readonly api: string,
  ) {}

  public loadList(): Observable<QuestShort[]> {
    return this.httpClient
    .get<QuestShort[]>(`${ this.api }/quest`)
    .pipe(
      map(json => json),
    );
  }

  public getQuestById(id: string): Observable<Quest> {
    return this.httpClient
    .get<Quest>(`${ this.api }/quest/${ id }`)
    .pipe(
      map(json => json),
    );
  }

  public createQuest(quest: QuestShort): Observable<string> {
    const {
      link,
      name,
      text,
      pictureLink,
      items,
    } = quest;
    const body = {
      link,
      name,
      text,
      pictureLink,
      items,
    };
    return this.httpClient
      .post<{ code: string }>(`${ this.api }/quest`, body)
      .pipe(
        map(json => json.code),
      );
  }

  public updateQuest(quest: QuestShort): Observable<string> {
    const {
      _id,
      link,
      name,
      text,
      pictureLink,
      items,
    } = quest;

    const body = {
      link,
      name,
      text,
      pictureLink,
      items,
    };
    return this.httpClient
      .patch<{ code: string }>(`${ this.api }/quest/${ _id }`, body)
      .pipe(
        map(json => json.code),
      );
  }

  public deleteQuest(id: string): Observable<string> {
    return this.httpClient
      .delete<{ code: string }>(`${ this.api }/quest/${ id }`)
      .pipe(
        map(json => json.code),
      );
  }
}
