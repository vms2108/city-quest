import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cq-route-cookie',
  template: '<cq-cookie></cq-cookie>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteCookieComponent {

  constructor() { }

}
