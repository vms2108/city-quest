import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Quest } from 'src/app/common/models/quest';

import { QUEST_INFO, QUEST_PROVIDERS } from './quest.providers';

@Component({
  selector: 'cq-quest',
  templateUrl: './quest.component.html',
  styleUrls: ['./quest.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: QUEST_PROVIDERS,
})
export class QuestComponent {

  constructor(
    @Inject(QUEST_INFO) readonly quest$: Observable<Quest>,
  ) { }
}
