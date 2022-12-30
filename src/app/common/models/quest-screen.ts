import { ScreenTypesEnum } from 'src/app/common/enums/screen-types.enum';

import { QuestScreenParameters } from './quest-screen-parameters';

export class QuestScreen {
  constructor(
    public _id: string,
    public name: string,
    public type: ScreenTypesEnum,
    public parameters: QuestScreenParameters,
  ) {}
}
