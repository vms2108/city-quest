import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminPagesEnum } from 'src/app/modules/admin/common/enums/admin-pages.enum';
import { AdminMenuItem } from 'src/app/modules/admin/common/models/admin-menu-item';

@Component({
  selector: 'cq-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminMenuComponent implements OnInit { // Переименовал из OfferMenuComponent в AdminMenuComponent
  public readonly rows: AdminMenuItem[] = [
    {
      label: 'Города',
      type: AdminPagesEnum.CITY,
      link: '/admin/cities',
    },
    {
      label: 'Квесты',
      type: AdminPagesEnum.QUEST,
      link: '/admin/quests',
    },
    {
      label: 'Экраны',
      type: AdminPagesEnum.SCREEN,
      link: '/admin/screens',
    },
    {
      label: 'Блоки',
      type: AdminPagesEnum.BLOCK,
      link: '/admin/blocks',
    },
  ];

  public currentType: AdminPagesEnum = AdminPagesEnum.QUEST;

  constructor(
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.getCurrentLink();
  }

  public setCurrentType(item: AdminMenuItem): void {
    this.currentType = item.type;
    this.router.navigate([item.link]);
    this.changeDetectorRef.markForCheck();
  }

  private getCurrentLink(): void {
    const url = this.router.url;
    const find = this.rows.find(row => url.startsWith(row.link));
    this.currentType = find ? find.type : AdminPagesEnum.QUEST;
    this.changeDetectorRef.markForCheck();
  }
}