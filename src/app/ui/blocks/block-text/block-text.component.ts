import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ScreenBlock } from 'src/app/common/models/screen-block';

@Component({
  selector: 'cq-block-text',
  templateUrl: './block-text.component.html',
  styleUrls: ['./block-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockTextComponent {

  @Input()
  public block!: ScreenBlock;

  constructor() { }

}
