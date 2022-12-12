import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { QuestScreen } from 'src/app/common/models/quest-screen';

@Component({
  selector: 'cq-quest-item',
  templateUrl: './quest-item.component.html',
  styleUrls: ['./quest-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestItemComponent {

  @Input()
  public item!: QuestScreen;

  @Output()
  public goToScreen = new EventEmitter<void>();

  constructor() { }

}
