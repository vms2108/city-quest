import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL_GATEWAY } from 'src/app/api-service.config';
import { QuestScreen } from 'src/app/common/models/quest-screen';

@Injectable()
export class ScreenService {

  constructor(
    private readonly httpClient: HttpClient,
    @Inject(API_URL_GATEWAY) private readonly api: string,
  ) {}

  public loadList(): Observable<QuestScreen[]> {

    return this.httpClient
    .get<QuestScreen[]>(`${ this.api }/screen`)
    .pipe(
      map(json => json),
    );
  }

  public createScreen(screen: QuestScreen): Observable<string> {
    const {
      name,
      type,
      parameters,
    } = screen;

    const body = {
      name,
      type,
      parameters,
    };
    return this.httpClient
      .post<{ code: string }>(`${ this.api }/screen`, body)
      .pipe(
        map(json => json.code),
      );
  }

  public updateScreen(screen: QuestScreen): Observable<string> {
    const {
      _id,
      name,
      type,
      parameters,
    } = screen;

    const body = {
      name,
      type,
      parameters,
    };
    return this.httpClient
      .patch<{ code: string }>(`${ this.api }/screen/${ _id }`, body)
      .pipe(
        map(json => json.code),
      );
  }

  public deleteScreen(id: string): Observable<string> {
    return this.httpClient
      .delete<{ code: string }>(`${ this.api }/screen/${ id }`)
      .pipe(
        map(json => json.code),
      );
  }
}
