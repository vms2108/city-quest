import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Quest } from 'src/app/common/models/quest';

import { QUEST_123 } from './constants/123-quest';

@Injectable()
export class QuestService {

  private readonly ALL_QUESTS = [QUEST_123];

  constructor(
  ) {}

  // сделать передачу хидеров на уровне универсального обработчика запросов
  public loadQuest(id: string): Observable<Quest | null> {
    return of(this.mockLoadByType(id)).pipe(delay(500));
  }

  private mockLoadByType(type: string): Quest | null {
    return this.ALL_QUESTS.find(item => item.id === type) || null;
  }
}
