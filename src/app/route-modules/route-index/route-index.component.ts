import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cq-route-index',
  templateUrl: './route-index.component.html',
  styleUrls: ['./route-index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteIndexComponent {

  constructor() { }

}
