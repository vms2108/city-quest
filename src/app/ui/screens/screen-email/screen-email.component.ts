import { PasswordControlModule } from 'src/app/ui/controls/password-control/password-control.module';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, NgModule, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { InnerHtmlModule } from 'src/app/ui/safe-html/inner-html.module';
import { ScreenBtnModule } from 'src/app/ui/screen-btn/screen-btn.module';
import { Screen } from 'src/app/common/interfaces/screen.interface';
import { EmailControlModule } from '../../controls/email-control/email-control.module';
import { AuthService } from 'src/app/common/auth/auth.service';
import { finalize, Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoaderWithBackdropModule } from '../../loader-with-backdrop/loader-with-backdrop.module';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'cq-screen-email',
  templateUrl: './screen-email.component.html',
  styleUrls: ['./screen-email.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScreenEmailComponent implements OnChanges, OnDestroy {

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

  public refreshHappening = false;

  private destroy = new Subject<void>();

  constructor(
    private readonly authService: AuthService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly formBuilder: FormBuilder,
  ) {
    this.createForm();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (this.current) {
      this.checkRefreshToken();
    }
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  public apply(): void {
    this.setLoading(true);
    this.signUp();
  }

  private signUp(): void {
    this.authService
      .registerAndLogin(this.form.get('email')!.value, this.form.get('password')!.value)
      .pipe(
        takeUntil(this.destroy),
        finalize(() => this.setLoading(false))
      )
      .subscribe({
        next: () => {
          this.goNext.emit();
        },
        error: () => {
        }
      });
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          ),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
        ]
      ]
    });

    this.form.valueChanges.pipe(takeUntil(this.destroy)).subscribe(() => {
      this.changeDetectorRef.markForCheck();
    });
  }

  private checkRefreshToken(): void {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!!refreshToken) {
      this.refreshHappening = true;
      this.authService
        .refreshToken(refreshToken)
        .pipe(
          takeUntil(this.destroy),
          finalize(() => setTimeout(() => this.refreshHappening = false, 300)),
        )
        .subscribe(() => this.goNext.emit());
    }
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
    EmailControlModule,
    ReactiveFormsModule,
    PasswordControlModule,
    LoaderWithBackdropModule,
    RouterModule,
  ],
  declarations: [
    ScreenEmailComponent,
  ],
  exports: [
    ScreenEmailComponent,
  ]
})
export class ScreenEmailModule {
}
