import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Block } from 'src/app/common/interfaces/block.interface';
import { API_URL_GATEWAY } from 'src/app/api-service.config';

@Injectable()
export class AdminBlockService {
  constructor(
    private readonly http: HttpClient,
    @Inject(API_URL_GATEWAY) private readonly api: string
  ) {}

  public getAllBlocks(): Observable<Block[]> {
    return this.http.get<Block[]>(`${this.api}/blocks`);
  }

  public getBlockById(id: string): Observable<Block> {
    return this.http.get<Block>(`${this.api}/blocks/${id}`);
  }

  public createBlock(block: FormData): Observable<Block> {
    return this.http.post<Block>(`${this.api}/blocks`, block);
  }

  public updateBlock(block: FormData): Observable<Block> {
    return this.http.put<Block>(`${this.api}/blocks/${block.get('id')}`, block);
  }

  public deleteBlock(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.api}/blocks/${id}`);
  }
}