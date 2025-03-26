import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Quest } from 'src/app/common/interfaces/quest.interface';
import { API_URL_GATEWAY } from 'src/app/api-service.config';

@Injectable()
export class AdminQuestService {
  constructor(
    private readonly http: HttpClient,
    @Inject(API_URL_GATEWAY) private readonly api: string
  ) {}

  public getAllQuests(): Observable<Quest[]> {
    return this.http.get<Quest[]>(`${this.api}/quests`);
  }

  public getQuestById(id: number): Observable<Quest> {
    return this.http.get<Quest>(`${this.api}/quests/${id}`);
  }

  public createQuest(quest: Omit<Quest, 'id' | 'screens' | 'created_at' | 'updated_at'>): Observable<Quest> {
    return this.http.post<Quest>(`${this.api}/quests`, quest);
  }

  public updateQuest(id: string, quest: Omit<Quest, 'id' | 'screens' | 'created_at' | 'updated_at'>): Observable<Quest> {
    return this.http.put<Quest>(`${this.api}/quests/${id}`, quest);
  }

  public deleteQuest(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.api}/quests/${id}`);
  }

  public addScreenToQuest(questId: number, screenId: number, order: number): Observable<{ id: number; quest_id: number; screen_id: number; order: number }> {
    return this.http.post<{ id: number; quest_id: number; screen_id: number; order: number }>(
      `${this.api}/quests/${questId}/screens`,
      { screen_id: screenId, order }
    );
  }
}
