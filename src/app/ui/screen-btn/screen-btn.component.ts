import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'cq-screen-btn',
  templateUrl: './screen-btn.component.html',
  styleUrls: ['./screen-btn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenBtnComponent {

  @Input()
  public text!: string;

  @Input()
  public disabled = false;

  @Input()
  public fromAdmin = false;

  @Output()
  public apply = new EventEmitter<void>();

  constructor() { }

}
