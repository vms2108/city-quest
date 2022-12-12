import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ScreenBlock } from 'src/app/common/models/screen-block';

@Component({
  selector: 'cq-block-question',
  templateUrl: './block-question.component.html',
  styleUrls: ['./block-question.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockQuestionComponent {

  @Input()
  public block!: ScreenBlock;

  constructor() { }

}
