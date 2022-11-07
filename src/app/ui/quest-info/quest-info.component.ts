import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { QuestShort } from 'src/app/common/models/quest-short';

@Component({
  selector: 'cq-quest-info',
  templateUrl: './quest-info.component.html',
  styleUrls: ['./quest-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestInfoComponent {

  @Input()
  public quest!: QuestShort;

  @Input()
  public userProgress!: number;

  @Output()
  public goToQuest = new EventEmitter<void>();

  public getWidth(): number {
    return this.userProgress / this.quest.length * 100;
  }
}
