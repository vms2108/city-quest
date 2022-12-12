import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ScreenBlock } from 'src/app/common/models/screen-block';

@Component({
  selector: 'cq-block-fact',
  templateUrl: './block-fact.component.html',
  styleUrls: ['./block-fact.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockFactComponent {

  @Input()
  public block!: ScreenBlock;

  constructor() { }

}
