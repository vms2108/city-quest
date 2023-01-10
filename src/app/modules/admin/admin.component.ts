import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FooterService } from 'src/app/root-components/footer/footer.service';
import { HeaderService } from 'src/app/root-components/header/header.service';

@Component({
  selector: 'cq-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent implements OnInit, OnDestroy {

  constructor(
    private readonly footerService: FooterService,
    private readonly headerService: HeaderService,
  ) {}

  public ngOnInit(): void {
    this.footerService.changeVisible(false);
    this.headerService.changeVisible(false);
  }

  public ngOnDestroy(): void {
    this.footerService.changeVisible(true);
    this.headerService.changeVisible(true);
  }
}
