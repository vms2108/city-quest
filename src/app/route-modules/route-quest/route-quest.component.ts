import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cq-route-quest',
  template: '<cq-quest></cq-quest>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RouteQuestComponent {

  constructor() { }

}
