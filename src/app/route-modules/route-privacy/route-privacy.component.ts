import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cq-route-privacy',
  template: '<cq-privacy></cq-privacy>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutePrivacyComponent {

  constructor() { }

}
