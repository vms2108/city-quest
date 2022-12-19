import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ScreenBlock } from 'src/app/common/models/screen-block';

@Component({
  selector: 'cq-block-question-verse',
  templateUrl: './block-question-verse.component.html',
  styleUrls: ['./block-question-verse.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockQuestionVerseComponent {

  @Input()
  public block!: ScreenBlock;

  constructor() { }

}
