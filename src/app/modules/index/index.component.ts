import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cq-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexComponent {

  constructor() { }

}
