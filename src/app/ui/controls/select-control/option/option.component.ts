import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'cq-option',
  templateUrl: './option.component.html',
  styleUrls: ['./option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OptionComponent<T = any> {

  @Input()
  public value!: T | null;

}
