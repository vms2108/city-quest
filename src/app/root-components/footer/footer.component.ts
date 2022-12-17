import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FooterService } from './footer.service';

@Component({
  selector: 'cq-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {

  public state = this.footerService.getFooterState();

  constructor(
    private readonly footerService: FooterService,
  ) {}

}
