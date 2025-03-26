import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from 'src/app/common/interfaces/city.interface';
import { API_URL_GATEWAY } from 'src/app/api-service.config';

@Injectable()
export class AdminCityService {
  constructor(
    private readonly http: HttpClient,
    @Inject(API_URL_GATEWAY) private readonly api: string
  ) {}

  public getAllCities(): Observable<City[]> {
    return this.http.get<City[]>(`${this.api}/cities`);
  }

  public getCityById(id: string): Observable<City> {
    return this.http.get<City>(`${this.api}/cities/${id}`);
  }

  public createCity(city: Omit<City, 'id' | 'quests' | 'created_at' | 'updated_at'>): Observable<City> {
    return this.http.post<City>(`${this.api}/cities`, city);
  }

  public updateCity(id: string, city: Omit<City, 'id' | 'quests' | 'created_at' | 'updated_at'>): Observable<City> {
    return this.http.put<City>(`${this.api}/cities/${id}`, city);
  }

  public deleteCity(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.api}/cities/${id}`);
  }
}
