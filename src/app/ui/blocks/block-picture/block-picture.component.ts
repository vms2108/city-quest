import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgModule, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { InnerHtmlModule } from 'src/app/ui/safe-html/inner-html.module';

@Component({
  selector: 'cq-block-picture',
  templateUrl: './block-picture.component.html',
  styleUrls: ['./block-picture.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlockPictureComponent implements OnInit, OnDestroy, OnChanges {
  @Input()
  public block!: any;

  @Input()
  public current!: boolean;

  @Output()
  public selectAnswer = new EventEmitter<string>();

  isModalOpen = false; // Флаг для открытия/закрытия модального окна

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  ngOnChanges(changes: SimpleChanges): void {}

  // Открытие модального окна
  openModal(): void {
    this.isModalOpen = true;
  }

  // Закрытие модального окна
  closeModal(): void {
    this.isModalOpen = false;
  }
}

@NgModule({
  imports: [
    CommonModule,
    InnerHtmlModule,
  ],
  declarations: [
    BlockPictureComponent,
  ],
  exports: [
    BlockPictureComponent,
  ],
})
export class BlockPictureModule {}
