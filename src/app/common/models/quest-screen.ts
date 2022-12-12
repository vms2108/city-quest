import { ScreenTypesEnum } from 'src/app/common/enums/screen-types.enum';

import { ScreenBlock } from './screen-block';

export class QuestScreen {
  constructor(
    public id: string,
    public name: string,
    public type: ScreenTypesEnum,
    public order: number,
    public blocks: ScreenBlock[],
  ) {}
}
