import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL_GATEWAY } from 'src/app/api-service.config';
import { Quest } from '../../interfaces/quest.interface';

@Injectable()
export class QuestService {

  constructor(
    private readonly httpClient: HttpClient,
    @Inject(API_URL_GATEWAY) private readonly api: string,
  ) {}

  public loadList(): Observable<Quest[]> {
    return this.httpClient.get<Quest[]>(`${this.api}/for_users/quests`).pipe(
      map(json => json),
    );
  }

  public getCities(): Observable<{ id: string; name: string; link: string }[]> {
    return this.httpClient.get<{ id: string; name: string; link: string }[]>(`${this.api}/for_users/cities`).pipe(
      map(json => json),
    );
  }

  public getFullQuestByLink(link: string): Observable<Quest> {
    return this.httpClient.get<Quest>(`${this.api}/for_users/quests/${link}`).pipe(
      map(json => json),
    );
  }
}
