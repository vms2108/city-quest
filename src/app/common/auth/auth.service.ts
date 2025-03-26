import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthResponse } from '../interfaces/auth-response.interface';
import { API_URL_GATEWAY } from 'src/app/api-service.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private readonly http: HttpClient,
    @Inject(API_URL_GATEWAY) private readonly api: string
  ) {}

  public registerAndLogin(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.api}/auth/auto`, { email, password })
      .pipe(tap(response => {
        if (response.accessToken && response.refreshToken) {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
          localStorage.setItem('email', response.email);
        }
      }));
  }

  public register(email: string, password: string, role: 'admin' | 'user' = 'user'): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.api}/auth/register`, { email, password, role });
  }

  public login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.api}/auth/login`, { email, password }).pipe(
      tap(response => {
        if (response.accessToken && response.refreshToken) {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
          localStorage.setItem('email', response.email);
        }
      })
    );
  }

  public getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  public logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  public refreshToken(refreshToken: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.api}/auth/refresh`, { refreshToken })
      .pipe(
        tap(response => {
          if (response.accessToken && response.refreshToken) {
            localStorage.setItem('accessToken', response.accessToken);
            localStorage.setItem('refreshToken', response.refreshToken);
            localStorage.setItem('email', response.email);
          }
        })
      );
  }

  public isLoggedIn(): boolean {
    return !!this.getToken();
  }

  public getTokenAndRefresh(): Observable<AuthResponse | null> {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!!refreshToken) {
      return this.refreshToken(refreshToken)
    }
    return of(null);
  }
}
