import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cq-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent {

  constructor() { }

}
