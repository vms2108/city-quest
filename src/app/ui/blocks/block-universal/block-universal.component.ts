import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BlockTypesEnum } from 'src/app/common/enums/block-types.enum';
import { ScreenBlock } from 'src/app/common/models/screen-block';

@Component({
  selector: 'cq-block-universal',
  templateUrl: './block-universal.component.html',
  styleUrls: ['./block-universal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockUniversalComponent {

  @Input()
  public block!: ScreenBlock;

  public readonly TYPES = BlockTypesEnum;

  constructor() { }

}
