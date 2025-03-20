import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Screen } from 'src/app/common/interfaces/screen.interface';
import { API_URL_GATEWAY } from 'src/app/api-service.config';

@Injectable()
export class ScreenService {
  constructor(
    private readonly http: HttpClient,
    @Inject(API_URL_GATEWAY) private readonly api: string
  ) {}

  public getAllScreens(): Observable<Screen[]> {
    return this.http.get<Screen[]>(`${this.api}/screens`)
    .pipe(
      map(screens => screens.sort((a, b) => {
        const dateA = new Date(a.updated_at!);
        const dateB = new Date(b.updated_at!);
        return dateB.getTime() - dateA.getTime();
      }))
    );;
  }

  public getScreenById(id: string): Observable<Screen> {
    return this.http.get<Screen>(`${this.api}/screens/${id}`);
  }

  public createScreen(
    title: string,
    blocks: { block_id: string; order: number }[] = [],
    button_text: string,
    parameters: Record<string, any>,
    type: string = 'common'
  ): Observable<Screen> {
    return this.http.post<Screen>(`${this.api}/screens`, { title, button_text, parameters, blocks, type });
  }

  public updateScreen(screen: Screen): Observable<Screen> {
    const blockLinks = screen.blocks || [];
    return this.http.put<Screen>(`${this.api}/screens/${screen.id}`, {
      title: screen.title,
      button_text: screen.button_text,
      parameters: screen.parameters,
      type: screen.type,
      blocks: blockLinks,
    });
  }

  public deleteScreen(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.api}/screens/${id}`);
  }

  public addBlockToScreen(screenId: string, blockId: string, order: number): Observable<{ id: number; screen_id: string; block_id: string; order: number }> {
    return this.http.post<{ id: number; screen_id: string; block_id: string; order: number }>(
      `${this.api}/screens/${screenId}/blocks`,
      { block_id: blockId, order }
    );
  }
}
