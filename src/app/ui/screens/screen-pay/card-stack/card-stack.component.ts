import { Component, Input, AfterViewInit, ChangeDetectorRef, OnDestroy } from '@angular/core';

interface Card {
  id: number;
  description: Description;
  isMoving?: boolean;
  isExiting?: boolean;
}

interface Description {
  title: string;
  text: string;
  buttonText: string;
  subjects?: string[],
  img?: string;
}

const descriptions: Description[] = [
  {
    title: "Начало на Невском",
    text: "Ты стоишь у Казанского собора. Вокруг шумит главная артерия города. Куда пойдёшь дальше?",
    buttonText: "Дальше",
    img: "pay1-min.jpg"
  },
  {
    title: "Тайна Медного всадника",
    text: "Памятник Петру I впечатляет мощью. Слышал ли ты его легенды? Пора проверить знания!",
    buttonText: "Ответить",
    subjects: [
      "Камень привезли из Финляндии",
      "Памятник оживает ночью",
      "Его создал Растрелли",
      "Пётр указывает на Швецию"
    ]
  },
  {
    title: "Вид с Исаакия",
    text: "Поднимись на колоннаду Исаакиевского собора. Перед тобой раскинулся весь Петербург. Сделай фото!",
    buttonText: "Дальше",
    img: "pay2-min.jpg"
  },
  {
    title: "Секреты Эрмитажа",
    text: "Ты у Зимнего дворца. Здесь хранится миллион тайн. Готов разгадать одну?",
    buttonText: "Разгадать",
    subjects: [
      "Коты охраняют подвалы",
      "Трон украден французами",
      "Здание зелёное случайно",
      "Картины прячут ночью"
    ]
  },
  {
    title: "Мосты над Невой",
    text: "Дворцовый мост манит туристов. Ночью он разводится для кораблей. Посмотри на воду!",
    buttonText: "Дальше",
    img: "pay3-min.jpg"
  },
  {
    title: "Финал у Спаса",
    text: "Спас на Крови сияет мозаикой. Ты почти закончил квест. Сфотографируйся на память!",
    buttonText: "Завершить",
    img: "pay4-min.jpg"
  }
];

@Component({
  selector: 'cq-card-stack',
  templateUrl: './card-stack.component.html',
  styleUrls: ['./card-stack.component.scss']
})
export class CardStackComponent implements AfterViewInit, OnDestroy {
  @Input()
  public header!: string;

  _cards: Card[] = [];
  private intervalId: any;

  constructor(private cdr: ChangeDetectorRef) {
    this._cards = descriptions.map((description, index) => ({ id: index, description }));
  }

  ngAfterViewInit() {
    this.startMoving();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  moveCard() {
    if (this._cards.length > 1) {
      const firstCard = this._cards[0];
      this._cards.forEach((card, index) => {
        if (index === 0) {
          card.isExiting = true;
        } else {
          card.isMoving = true;
        }
      });
      this.cdr.detectChanges();

      setTimeout(() => {
        this._cards = [...this._cards.slice(1), firstCard];
        this._cards.forEach((card) => {
          card.isExiting = false;
          card.isMoving = false;
        });
        this.cdr.detectChanges();
      }, 500);
    }
  }

  startMoving() {
    this.intervalId = setInterval(() => this.moveCard(), 2000);
  }
}
