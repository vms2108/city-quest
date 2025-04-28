import { TextareaControlModule } from 'src/app/ui/controls/textarea-control/textarea-control.module';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, NgModule, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { InnerHtmlModule } from 'src/app/ui/safe-html/inner-html.module';
import { ScreenBtnModule } from 'src/app/ui/screen-btn/screen-btn.module';
import { Screen } from 'src/app/common/interfaces/screen.interface';
import { finalize, Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoaderWithBackdropModule } from '../../loader-with-backdrop/loader-with-backdrop.module';
import { RouterModule } from '@angular/router';
import { AnalyticService } from 'src/app/common/services/analytic.service';

@Component({
  selector: 'cq-screen-review',
  templateUrl: './screen-review.component.html',
  styleUrls: ['./screen-review.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenReviewComponent implements OnChanges, OnDestroy {

  @Input()
  public screen!: Screen;

  @Input()
  public fromAdmin = false;

  @Input()
  public current = false;

  @Output()
  public goNext = new EventEmitter<string>();

  public form!: FormGroup;

  public loading = false;

  private destroy = new Subject<void>();

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly formBuilder: FormBuilder,
    private readonly analyticService: AnalyticService,
  ) {
    this.createForm();
  }

  public ngOnChanges(changes: SimpleChanges): void {
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  public apply(): void {
    this.setLoading(true);
    this.sendReview();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      review: [
        '',
      ],
      rating: [
        null,
        [
          Validators.required,
        ]
      ]
    });

    this.form.valueChanges.pipe(takeUntil(this.destroy)).subscribe(() => {
      this.changeDetectorRef.markForCheck();
    });
  }

  private sendReview(): void {
    this.analyticService
      .saveQuestReview(this.screen!.parameters!.quest_id, this.form.value.rating, this.form.value.review)
      .pipe(
        takeUntil(this.destroy),
        finalize(() => {
          this.setLoading(false),
          this.goNext.emit();
        })
      )
      .subscribe()
  }


  private setLoading(loading: boolean): void {
    this.loading = loading;
    this.changeDetectorRef.markForCheck();
  }
}

@NgModule({
  imports: [
    CommonModule,
    InnerHtmlModule,
    ScreenBtnModule,
    ReactiveFormsModule,
    LoaderWithBackdropModule,
    RouterModule,
    TextareaControlModule,
  ],
  declarations: [
    ScreenReviewComponent,
  ],
  exports: [
    ScreenReviewComponent,
  ]
})
export class ScreenReviewModule {
}
