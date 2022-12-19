import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'cq-quest-header',
  templateUrl: './quest-header.component.html',
  styleUrls: ['./quest-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestHeaderComponent {

  @Input()
  public title = '';

  @Input()
  public goBackBtnVisible = true;

  @Output()
  public goBack = new EventEmitter<void>();

  constructor() { }
}
