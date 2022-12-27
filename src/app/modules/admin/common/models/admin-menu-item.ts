import { AdminPagesEnum } from './../enums/admin-pages.enum';

export class AdminMenuItem {
  constructor(
    public label: string,
    public type: AdminPagesEnum,
    public link: string,
  ) {}
}
