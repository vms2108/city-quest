import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, NgModule, OnChanges, Output, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { InnerHtmlModule } from 'src/app/ui/safe-html/inner-html.module';
import { Screen } from 'src/app/common/interfaces/screen.interface';
import { ScreensCountModule } from 'src/app/ui/screens-count/screens-count.module';
import { CardStackComponent } from './card-stack/card-stack.component';
import { FakeCardComponent } from './fake-card/fake-card.component';
import { QuestService } from 'src/app/common/data/quest/quest.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'cq-screen-pay',
  templateUrl: './screen-pay.component.html',
  styleUrls: ['./screen-pay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenPayComponent implements OnChanges {

  @Input()
  public screen!: Screen;

  @Input()
  public fromAdmin = false;

  @Input()
  public current = false;

  @ViewChildren('cardElement')
  cardElements!: QueryList<ElementRef>;

  @Output()
  public goNext = new EventEmitter<string>();

  constructor(
    private questService: QuestService,
    private route: ActivatedRoute,
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
  }

  public apply(): void {
    const questLink = this.route.snapshot.params['quest']; // Извлекаем questLink из маршрута
    if (!questLink) {
      console.error('Quest link не найден в маршруте');
      return;
    }

    this.questService.processPayment(questLink).subscribe({
      next: (updatedQuest) => {
        this.goNext.emit('');
      },
      error: (err) => {
        console.error('Ошибка при оплате:', err);
      },
    });
  }
}

@NgModule({
  imports: [
    CommonModule,
    InnerHtmlModule,
    ScreensCountModule,
  ],
  declarations: [
    ScreenPayComponent,
    CardStackComponent,
    FakeCardComponent,
  ],
  exports: [
    ScreenPayComponent,
  ]
})
export class ScreenPayModule {
}
