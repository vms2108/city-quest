import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL_GATEWAY } from 'src/app/api-service.config';
import { QuestScreen } from 'src/app/common/models/quest-screen';

@Injectable()
export class AdminScreenService {

  constructor(
    private httpClient: HttpClient,
    @Inject(API_URL_GATEWAY) private api: string,
  ) {}

  public loadList(): Observable<QuestScreen[]> {

    return this.httpClient
    .get<{ payload: QuestScreen[] }>(`${ this.api }/screen`)
    .pipe(
      map(json => json.payload),
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
      id,
      name,
      type,
      parameters,
    } = screen;

    const body = {
      id,
      name,
      type,
      parameters,
    };
    return this.httpClient
      .patch<{ code: string }>(`${ this.api }/screen/${ id }`, body)
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
