import { ScreenBlock } from './screen-block';

export class QuestScreenParameters {
  constructor(
    public blocks: ScreenBlock[],
    public answers: string[] = [],
    public help: string = '',
  ) {}
}
