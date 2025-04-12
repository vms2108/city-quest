import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AnalyticService {

  private baseUrl = '/api/analytics';

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  public saveMusicRating(blockId: string, rating: number): Observable<any> {
    const body = {
      block_id: blockId,
      rating,
      browser_id: this.storageService.getUserId()
    };
    return this.http.post(`${this.baseUrl}/music-rating`, body);
  }

  public saveQuestReview(questId: string, rating: number, review?: string): Observable<any> {
    const body = {
      quest_id: questId,
      rating,
      review
    };
    return this.http.post(`${this.baseUrl}/quest-review`, body);
  }

  public trackEvent(eventName: string, parameters: any = {}): Observable<any> {
    const body = {
      event_name: eventName,
      parameters,
      browser_id: this.storageService.getUserId()
    };
    return this.http.post(`${this.baseUrl}/event`, body)
      .pipe(
        map((response: any) => ({
          ...response,
          parameters: typeof response.parameters === 'string' 
            ? JSON.parse(response.parameters) 
            : response.parameters
        }))
      );
  }
}
