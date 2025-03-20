import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Quest } from 'src/app/common/interfaces/quest.interface';

@Component({
  selector: 'cq-quest-info',
  templateUrl: './quest-info.component.html',
  styleUrls: ['./quest-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestInfoComponent {

  @Input()
  public quest!: Quest;

  @Input()
  public userProgress!: number;

  @Output()
  public goToQuest = new EventEmitter<void>();

  public getWidth(): number {
    return this.userProgress / this.quest.screens!.length * 100;
  }
}
