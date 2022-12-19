import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { HeaderState } from './header.state';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private readonly INITIAL_STATE = new HeaderState(true);

  private state = new BehaviorSubject<HeaderState>(this.INITIAL_STATE);

  public changeVisible(visible: boolean): void {
    const oldState = this.state.getValue();
    this.state.next({ ...oldState, visible });
  }

  public getHeaderState(): Observable<HeaderState> {
    return this.state.asObservable();
  }
}
