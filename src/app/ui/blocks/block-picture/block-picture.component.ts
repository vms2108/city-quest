import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ScreenBlock } from 'src/app/common/models/screen-block';

@Component({
  selector: 'cq-block-picture',
  templateUrl: './block-picture.component.html',
  styleUrls: ['./block-picture.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockPictureComponent {

  @Input()
  public block!: ScreenBlock;

  constructor() { }

}
