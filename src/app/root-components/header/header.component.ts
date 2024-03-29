import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';

import { HeaderService } from './header.service';

@Component({
  selector: 'cq-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

  public opened = false;

  public scrolled = false;

  public state = this.headerService.getHeaderState();

  constructor(
    private readonly headerService: HeaderService,
  ) {}
}
