import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'src/app/common/auth/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private readonly auth: AuthService,
    private readonly authService: AuthService,
  ) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = req;
    if (this.auth.isAuthenticated()) {
      request  = req.clone({
        setHeaders: {
          Authorization: this.auth.getToken()!,
        },
      });
    }
    return next.handle(request).pipe(
      catchError(
        (error: HttpErrorResponse) => this.handleAuthError(error),
      ),
    );
  }

  private handleAuthError(error: HttpErrorResponse): Observable<HttpEvent<any>> {
    if (error.status === 401) {
      this.authService.logout();
    }

    return throwError(error);
  }
}
