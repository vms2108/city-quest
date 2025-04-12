import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'cq-quest-music-rating',
  templateUrl: './quest-music-rating.component.html',
  styleUrls: ['./quest-music-rating.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class QuestMusicRatingComponent {

  constructor(
    
  ) {}

  @Output()
  public ratingSubmitted = new EventEmitter<number>();

  @Output() closeModal = new EventEmitter<void>();

  rating: number = 0;

  submitRating(): void {
    if (this.rating > 0) {
      this.ratingSubmitted.emit(this.rating);
    }
  }

  close(): void {
    this.closeModal.emit();
  }

}
