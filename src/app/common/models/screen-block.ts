import { BlockTypesEnum } from 'src/app/common/enums/block-types.enum';

export class ScreenBlock {
  constructor(
    public type: BlockTypesEnum,
    public text: string = '',
    public link: string = '',
  ) {}
}
