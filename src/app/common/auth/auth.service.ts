import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserJson } from '../interfaces/user.json-interface';

import { AuthApiErrors } from './auth.api-errors';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private token: string | null = null;

  constructor(
    private readonly http: HttpClient,
    private readonly authApiErrors: AuthApiErrors,
    private readonly router: Router,
  ) {
    this.token = localStorage.getItem('auth-token') || null;
    this.authApiErrors.registerErrors();
  }

  public login(user: UserJson): Observable<{token: string}> {
    return this.http
      .post<{token: string}>('/api/auth/login', user)
      .pipe(map(answer => {
        localStorage.setItem('auth-token', answer.token);
        this.setToken(answer.token);
        return answer;
      }));
  }

  public register(user: UserJson): Observable<UserJson> {
    return this.http
      .post<UserJson>('/api/auth/register', user)
      .pipe(map(answer => {
        return answer;
      }));
  }

  public getToken(): string | null {
    return this.token;
  }

  public isAuthenticated(): boolean {
    return !!this.token;
  }

  public logout(): void {
    this.setToken(null);
    localStorage.clear();
    this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url } });
  }

  public setToken(token: string | null): void {
    this.token = token;
  }
}
