import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cq-route-index',
  template: '<cq-index></cq-index>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteIndexComponent {

  constructor() { }

}
