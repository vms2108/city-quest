import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { API_ERRORS } from 'src/app/common/api-errors/api-errors.token';
import { AuthService } from 'src/app/common/auth/auth.service';
import { NotificationService } from 'src/app/ui/notifications/notification.service';

export interface APIErrorResponse {
  code?: string;
  message?: string;
  payload?: string;
}

@Injectable()
export class ApiErrorsInterceptor implements HttpInterceptor {

  constructor(
    private notificationService: NotificationService,
    @Inject(API_ERRORS) private apiErrors: Map<string, string>,
    private readonly authService: AuthService,
  ) {
  }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next
      .handle(request)
      .pipe(
        map(event => event),
        catchError((error: HttpErrorResponse) => {
          this.displayMessageIfError(error);
          if (error.status === 401) {
            this.authService.logout();
          }

          return throwError(error);
        }),
      );
  }

  private displayMessageIfError(response: HttpErrorResponse): void {
    const error = <APIErrorResponse> response.error;
    const message = this.apiErrors.get(error.code || '') || error!.message || error.payload ||  'Неизвестная ошибка.';
    this.notificationService.error(message, '');
  }

}
