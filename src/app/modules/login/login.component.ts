import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/common/auth/auth.service';
import { TitleService } from 'src/app/common/services/title.service';

@Component({
  selector: 'cq-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit, OnDestroy {

  public readonly LOGIN_MAX_LENGTH = 50;

  public readonly LOGIN_MIN_LENGTH = 3;

  public loginForm!: FormGroup;

  public loading = false;

  private destroy = new Subject<void>();

  private returnUrl!: string;

  private readonly TITLE = 'Авторизация';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly authService: AuthService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly titleService: TitleService,
  ) {
  }

  public ngOnInit(): void {
    this.titleService.setTitle(this.TITLE);
    this.createForm();
    this.checkAuth();
  }

  public ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  public submitLogin(): void {
    this.setLoading(true);
    const email = this.loginForm.get('login')!.value;
    const password = this.loginForm.get('password')!.value;
    const user = { email, password };
    this.authService
      .login(user)
      .pipe(
        takeUntil(this.destroy),
        finalize(() => this.setLoading(false)),
      )
      .subscribe(() => this.router.navigate([this.returnUrl]));
  }

  public hasErrorInCommonDataForm(controlName: string, errorCode: string): boolean {
    const control = this.loginForm.get(controlName)!;

    return control.dirty && control.hasError(errorCode);
  }

  private createForm(): void {
    this.loginForm = this.formBuilder.group({
      login: ['', [
        Validators.required,
        Validators.minLength(this.LOGIN_MIN_LENGTH),
        Validators.maxLength(this.LOGIN_MAX_LENGTH),
      ]],
      password: ['', [Validators.required]],
    });
  }

  private checkAuth(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    if (this.authService.isAuthenticated()) {
      this.router.navigate([this.returnUrl]);
    }
  }

  private setLoading(loading: boolean): void {
    this.loading = loading;
    this.changeDetectorRef.markForCheck();
  }

}
