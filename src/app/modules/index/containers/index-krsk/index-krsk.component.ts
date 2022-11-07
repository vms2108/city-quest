import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'cq-index-krsk',
  templateUrl: './index-krsk.component.html',
  styleUrls: ['./index-krsk.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexKrskComponent {

  public openedItem = '';

  public changeOpenedItem(elem: string): void {
    this.openedItem = this.openedItem === elem ? '' : elem;
  }
}
