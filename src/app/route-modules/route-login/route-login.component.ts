import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cq-route-login',
  template: '<cq-login></cq-login>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteLoginComponent {

  constructor() { }

}
