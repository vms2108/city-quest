import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TitleService {

  private titleSubject = new BehaviorSubject<string>('');

  constructor(
    private title: Title,
    ) {
    this.titleSubject.next(title.getTitle());
  }

  public setTitle(title: string): void {
    this.title.setTitle(title);
    this.titleSubject.next(title);
  }

  public getTitle(): Observable<string> {
    return this.titleSubject.asObservable();
  }
}
