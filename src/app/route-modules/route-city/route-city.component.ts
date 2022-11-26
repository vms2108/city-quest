import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cq-route-city',
  template: '<cq-city></cq-city>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteCityComponent {

  constructor() { }

}
