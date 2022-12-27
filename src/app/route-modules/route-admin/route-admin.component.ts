import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cq-route-admin',
  template: '<cq-admin></cq-admin>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteAdminComponent {

  constructor() { }

}
