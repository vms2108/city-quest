import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cq-admin-image',
  templateUrl: './admin-image.component.html',
  styleUrls: ['./admin-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminImageComponent {

  constructor() { }

}
