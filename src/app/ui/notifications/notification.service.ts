import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Notification, NotificationType } from './notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private subject = new Subject<Notification>();
  private idx = 0;

  constructor() { }

  public getObservable(): Observable<Notification> {
    return this.subject.asObservable();
  }

  public info(title: string, message: string, timeout = 3000): void {
    this.subject.next(new Notification(this.idx++, NotificationType.info, title, message, timeout));
  }

  public success(title: string, message = '', timeout = 3000): void {
    this.subject.next(new Notification(this.idx++, NotificationType.success, title, message, timeout));
  }

  public warning(title: string, message = '', timeout = 3000): void {
    this.subject.next(new Notification(this.idx++, NotificationType.warning, title, message, timeout));
  }

  public error(title: string, message: string, timeout = 10000): void {
    this.subject.next(new Notification(this.idx++, NotificationType.error, title, message, timeout));
  }

}
