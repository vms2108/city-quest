import { AuthService } from 'src/app/common/auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { API_URL_GATEWAY } from 'src/app/api-service.config';
import { Quest } from '../../interfaces/quest.interface';
import { BEFORE_EMAIL, BEFORE_PAY, SCREEN_EMAIL, SCREEN_PAY } from '../../constants/default-screens';
import { Screen } from '../../interfaces/screen.interface';
import { StorageService } from '../../services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class QuestService {

  private questSubject = new BehaviorSubject<Quest | null>(null);

  constructor(
    private readonly httpClient: HttpClient,
    private readonly authService: AuthService,
    private readonly storageService: StorageService,
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

  public processPayment(questLink: string): Observable<Quest> {
    const email = localStorage.getItem('email');
    if (!email) {
      throw new Error('Email не найден в localStorage');
    }

    const paymentData = { email, quest_id: questLink };

    const currentProgress = this.storageService.getData(questLink);
    const prePaymentScreens = this.questSubject.value?.screens || [];

    return this.httpClient.post(`${this.api}/purchases/external-purchase`, paymentData).pipe(
      tap(() => this.setRealProgress(questLink, currentProgress, prePaymentScreens)),
      switchMap(() => this.getFullQuestByLink(questLink))
    );
  }

  public getQuestObservable(): Observable<Quest | null> {
    return this.questSubject.asObservable();
  }

  private setRealProgress(questLink: string, currentProgress: string | null, prePaymentScreens: Screen[]): void {
    if (currentProgress === null) return;

    const currentIndex = parseInt(currentProgress, 10);
    const conditionalScreensCount = prePaymentScreens.filter(screen =>
      screen.type === 'email' || screen.type === 'pay' || screen.type === 'wyg'
    ).length;

    const adjustedIndex = Math.max(0, currentIndex - conditionalScreensCount);
    this.storageService.saveData(questLink, adjustedIndex.toString());
  }

  public getFullQuestByLink(link: string): Observable<Quest> {
    const email = localStorage.getItem('email');
    return this.httpClient
      .get<Quest>(`${this.api}/for_users/quests/${link}`, { params: email ? { email } : {} })
      .pipe(
        map(quest => this.enrichQuestScreens(quest)),
        tap(updatedQuest => {
          this.questSubject.next(updatedQuest)
  })
      );
  }

  private enrichQuestScreens(quest: Quest): Quest {
    const screens = quest.screens ?? [];
    const screensCount = quest.screens_count ?? 0;
    const freeScreensCount = quest.free_screens_count ?? 0;
    const paidScreensCount = screensCount - freeScreensCount;
    const questDescription = quest.description;
  
    // Добавляем параметры в существующие экраны
    const enrichedScreens = screens.map(screen => ({
      ...screen,
      parameters: {
        ...(screen.parameters ?? {}), // Сохраняем существующие parameters или создаём пустой объект
        screens_count: screensCount,
        free_screens_count: freeScreensCount,
        paid_screens_count: paidScreensCount,
        quest_description: questDescription,
      }
    }));
  
    if (enrichedScreens.length < screensCount) {
      this.addConditionalScreens(enrichedScreens, screensCount, freeScreensCount, paidScreensCount, questDescription!);
    }
  
    return {...quest, screens: enrichedScreens};
  }
  
  private addConditionalScreens(
    screens: Screen[],
    screensCount: number,
    freeScreensCount: number,
    paidScreensCount: number,
    questDescription: string,
  ): void {
    const commonParameters = {
      screens_count: screensCount,
      free_screens_count: freeScreensCount,
      paid_screens_count: paidScreensCount,
      quest_description: questDescription,
    };
  
    if (!this.authService.getToken()) {
      screens.push(this.mergeScreenWithParameters(BEFORE_EMAIL, commonParameters));
      screens.push(this.mergeScreenWithParameters(SCREEN_EMAIL, commonParameters));
    } else {
      screens.push(this.mergeScreenWithParameters(BEFORE_PAY, commonParameters));
    }
    screens.push(this.mergeScreenWithParameters(SCREEN_PAY, commonParameters));
  }

  private mergeScreenWithParameters(screen: Screen, commonParameters: Record<string, any>): Screen {
    return {
      ...screen,
      parameters: { ...(screen.parameters ?? {}), ...commonParameters }
    };
  }
}
