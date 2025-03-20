import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from 'src/app/common/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {

  private lastReturnUrl: string | null = null;

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,
  ) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    this.lastReturnUrl =  state.url;
    if (this.auth.isLoggedIn()) {
      return of(true);
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: this.lastReturnUrl } });
    return of(false);
  }

  public canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(childRoute, state);
  }
}
