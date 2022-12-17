import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { FooterState } from './footer.state';

@Injectable({
  providedIn: 'root',
})
export class FooterService {

  private readonly INITIAL_STATE = new FooterState(true);

  private state = new BehaviorSubject<FooterState>(this.INITIAL_STATE);

  public changeVisible(visible: boolean): void {
    const oldState = this.state.getValue();
    this.state.next({ ...oldState, visible });
  }

  public getFooterState(): Observable<FooterState> {
    return this.state.asObservable();
  }
}
