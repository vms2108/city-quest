import { AfterContentInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'cq-index-carousel',
  templateUrl: './index-carousel.component.html',
  styleUrls: ['./index-carousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexCarouselComponent implements OnInit, AfterContentInit {

  public initialElements = ['krsk', 'ekb', 'spb', 'msk'];

  public selectedElement = 'spb';

  public elements: string[] = [];

  public leftValue!: number;

  public itemsWidth!: number;

  public elementWidth!: number;

  public containerWidth!: number;

  public leftPadding!: number;

  public waiting = false;

  private viewPortWidth!: number;

  private swipeCoord!: [number, number];

  private swipeTime!: number;

  private readonly MAX_MOBILE_WIDTH = 1023;

  private readonly MAX_TABLET_WIDTH = 1199;

  private readonly ELEMENT_WIDTH_DESKTOP = 848;

  private readonly ELEMENT_WIDTH_TABLET = 700;

  private readonly ELEMENT_WIDTH_MOBILE = 320;

  private readonly CONTAINER_WIDTH_DESKTOP = 1200;

  private readonly CONTAINER_WIDTH_TABLET = 1024;

  private readonly CONTAINER_WIDTH_MOBILE = 335;

  private readonly ITEM_MARGIN_RIGHT = 32;

  private readonly BUTTON_WIDTH_DESKTOP = 144;

  private readonly BUTTON_WIDTH_TABLET = 130;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    this.leftValue = 0;
  }

  public ngOnInit(): void {
    this.getScreenSize();
    this.getElements();
  }

  public ngAfterContentInit(): void {
    this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  public getScreenSize(): void {
    this.viewPortWidth = window.innerWidth;
    this.getItemsWidth();
    this.initialLeftValue();
    this.changeDetectorRef.markForCheck();
  }

  public selectElement(element: string): void {
    this.selectedElement = element;
    this.changeDetectorRef.markForCheck();
  }

  public swipe(e: TouchEvent, when: string, desktop =  false): void {
    const coord: [number, number] = [e.changedTouches[0].clientX, e.changedTouches[0].clientY];
    const time = new Date().getTime();
    if (when === 'start') {
      this.swipeCoord = coord;
      this.swipeTime = time;
    } else if (when === 'end') {
      const direction = [coord[0] - this.swipeCoord[0], coord[1] - this.swipeCoord[1]];
      const duration = time - this.swipeTime;

      if (duration < 1000
        && Math.abs(direction[0]) > 30
        && Math.abs(direction[0]) > Math.abs(direction[1] * 3)) {
        if (desktop) {
          direction[0] < 0 ? this.next() : this.prev();
        } else {
          direction[0] < 0 ? this.swipeRight() : this.swipeLeft();
        }
      }
    }
  }

  public next(): void {
    if (!this.waiting) {
      this.waiting = true;
      const standartWidth =  this.elementWidth + this.ITEM_MARGIN_RIGHT;
      this.leftValue = this.leftValue - standartWidth;
      setTimeout(() => this.changeAfterNext(), 500);
    }
  }

  public prev(): void {
    if (!this.waiting) {
      this.waiting = true;
      const standartWidth =  this.elementWidth + this.ITEM_MARGIN_RIGHT;
      this.leftValue = this.leftValue + standartWidth;
      this.changeDetectorRef.markForCheck();
      setTimeout(() => this.changeAfterPrev(), 500);
    }
  }

  private getItemsWidth(): void {
    this.elementWidth =
      this.viewPortWidth > this.MAX_MOBILE_WIDTH ?
      this.viewPortWidth > this.MAX_TABLET_WIDTH ?
      this.ELEMENT_WIDTH_DESKTOP :
      this.ELEMENT_WIDTH_TABLET : this.ELEMENT_WIDTH_MOBILE;
    this.containerWidth =
      this.viewPortWidth > this.MAX_MOBILE_WIDTH ?
      this.viewPortWidth > this.MAX_TABLET_WIDTH ?
      this.CONTAINER_WIDTH_DESKTOP :
      this.CONTAINER_WIDTH_TABLET : this.CONTAINER_WIDTH_MOBILE;
    this.leftPadding =
      this.viewPortWidth > this.MAX_MOBILE_WIDTH ?
      this.viewPortWidth > this.MAX_TABLET_WIDTH ?
      this.BUTTON_WIDTH_DESKTOP + this.ITEM_MARGIN_RIGHT :
      this.BUTTON_WIDTH_TABLET + this.ITEM_MARGIN_RIGHT : 0;
    this.itemsWidth = (this.elementWidth + this.ITEM_MARGIN_RIGHT) * this.elements.length;
    this.changeDetectorRef.markForCheck();
  }

  private getElements(): void {
    this.elements = [...this.initialElements, ...this.initialElements];
  }

  private initialLeftValue(): void {
    this.waiting = false;
    this.leftValue = -(this.elementWidth + this.ITEM_MARGIN_RIGHT) * 2 + this.leftPadding;
    this.changeDetectorRef.markForCheck();
  }

  private changeAfterPrev(): void {
    this.elements = this.arraymove(this.elements, this.elements.length - 1, 0);
    this.initialLeftValue();
  }

  private changeAfterNext(): void {
    this.elements = this.arraymove(this.elements, 0, this.elements.length - 1);
    this.initialLeftValue();
  }

  private arraymove(array: string[], fromIndex: number, toIndex: number): string[] {
    const element = array[fromIndex];
    array.splice(fromIndex, 1);
    array.splice(toIndex, 0, element);
    return array;
  }

  private swipeLeft(): void {
    const index = this.elements.findIndex(e => e === this.selectedElement);
    if (index === 0) {
      this.selectElement(this.elements[this.elements.length - 1]);
    } else {
      this.selectElement(this.elements[index - 1]);
    }
  }

  private swipeRight(): void {
    const index = this.elements.findIndex(e => e === this.selectedElement);
    if (index === this.elements.length - 1) {
      this.selectElement(this.elements[0]);
    } else {
      this.selectElement(this.elements[index + 1]);
    }
  }
}
