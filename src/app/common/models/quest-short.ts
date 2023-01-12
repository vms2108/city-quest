export class QuestShort {
  constructor(
    public _id: string,
    public city: string,
    public link: string,
    public name: string,
    public text: string,
    public pictureLink: string,
    public items: string[],
  ) {}
}
