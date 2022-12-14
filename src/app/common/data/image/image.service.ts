import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL_GATEWAY } from 'src/app/api-service.config';
import { ScreenImage } from 'src/app/common/models/screen-image';
import { LocalFile } from 'src/app/ui/controls/file-control/models/local-file';

@Injectable()
export class ImageService {

  constructor(
    private readonly httpClient: HttpClient,
    @Inject(API_URL_GATEWAY) private readonly api: string,
  ) {}

  public loadList(): Observable<ScreenImage[]> {

    return this.httpClient
    .get<ScreenImage[]>(`${ this.api }/file`)
    .pipe(
      map(json => json),
    );
  }

  public createImage(file: LocalFile): Observable<string> {
    const formData = new FormData();
    if (file) {
      formData.append('image', file.data, file.data.name);
    }
    return this.httpClient
      .post<{ code: string }>(`${ this.api }/file`, formData)
      .pipe(
        map(json => json.code),
      );
  }

  public deleteImage(id: string): Observable<string> {
    return this.httpClient
      .delete<{ code: string }>(`${ this.api }/file/${ id }`)
      .pipe(
        map(json => json.code),
      );
  }
}
