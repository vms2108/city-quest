import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';

import { AdminPagesEnum } from '../common/enums/admin-pages.enum';
import { AdminMenuItem } from '../common/models/admin-menu-item';

@Component({
  selector: 'cq-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class OfferMenuComponent {
  public readonly rows: AdminMenuItem[] = [
    {
      label: 'Quest',
      type: AdminPagesEnum.QUEST,
      link: 'admin/quest',
    },
    {
      label: 'Screen',
      type: AdminPagesEnum.SCREEN,
      link: 'admin/screen',
    },
  ];

  public currentType = AdminPagesEnum.QUEST;

  constructor(
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    this.getCurrentLink();
  }

  public setCurentType(item: AdminMenuItem): void {
    this.currentType = item.type;
    this.router.navigate([item.link]);
  }

  private getCurrentLink(): void {
    const url = this.router.url;
    const find = this.rows.find(row => !!url.match(row.link));
    this.currentType = find ? find.type : AdminPagesEnum.QUEST;
    this.changeDetectorRef.markForCheck();
  }
}
