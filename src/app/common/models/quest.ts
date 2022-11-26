import { Screen } from './screen';

export class Quest {
  constructor(
    public id: string,
    public link: string,
    public name: string,
    public text: string,
    public pictureLink: string,
    public items: Screen[],
  ) {}
}
