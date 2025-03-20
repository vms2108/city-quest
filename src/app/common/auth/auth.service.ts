import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../interfaces/user.json-interface';
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

  public register(username: string, password: string, role: 'admin' | 'user' = 'admin'): Observable<User> {
    return this.http.post<User>(`${this.api}/auth/register`, { username, password, role });
  }

  public login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.api}/auth/login`, { username, password }).pipe(
      tap(response => {
        if (response.accessToken && response.refreshToken) {
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
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

  public refreshToken(refreshToken: string): Observable<{ accessToken: string; refreshToken: string }> {
    return this.http.post<{ accessToken: string; refreshToken: string }>(`${this.api}/auth/refresh`, { refreshToken });
  }

  public isLoggedIn(): boolean {
    return !!this.getToken(); // Проверяем наличие accessToken
  }
}
