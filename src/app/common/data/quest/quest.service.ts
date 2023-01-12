import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { API_URL_GATEWAY } from 'src/app/api-service.config';
import { Quest } from 'src/app/common/models/quest';
import { QuestScreen } from 'src/app/common/models/quest-screen';
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

  public getFullQuestByLink(link: string): Observable<Quest> {
    return this.getQuestByLink(link)
      .pipe(mergeMap(quest => this.getFullQuestByQuest(quest)));
  }

  public getFullQuestByQuest(quest: QuestShort): Observable<Quest> {
    const body = {
      items: quest.items,
    };
    return this.httpClient
    .post<QuestScreen[]>(`${ this.api }/screen/ids`, body)
    .pipe(
      map(json => {
        return new Quest(
          quest._id,
          quest.link,
          quest.name,
          quest.text,
          quest.pictureLink,
          quest.items.map(item => json.find(elem => elem._id === item)!),
        );
      }),
    );
  }

  public getQuestByLink(link: string): Observable<QuestShort> {
    return this.httpClient
    .get<QuestShort>(`${ this.api }/quest/${ link }`)
    .pipe();
  }

  public createQuest(quest: QuestShort): Observable<string> {
    const {
      link,
      name,
      text,
      pictureLink,
      items,
      city,
    } = quest;
    const body = {
      link,
      name,
      text,
      pictureLink,
      items,
      city,
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
      city,
    } = quest;

    const body = {
      link,
      name,
      text,
      pictureLink,
      items,
      city,
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
