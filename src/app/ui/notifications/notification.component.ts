import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Notification, NotificationType } from './notification';
import { NotificationService } from './notification.service';

@Component({
  selector: 'cq-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotificationListComponent implements OnInit, OnDestroy {

  public notifications: Notification[] = [];

  private subscription!: Subscription;

  constructor(
    private readonly notificationService: NotificationService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) { }

  public ngOnInit(): void {
    this.subscription = this.notificationService.getObservable()
      .subscribe(notification => this.addNotification(notification));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public close(notification: Notification): void {
    this.notifications = this.notifications.filter(notif => notif.id !== notification.id);
    this.changeDetectorRef.markForCheck();
  }

  public className(notification: Notification): string {

    let style: string;

    switch (notification.type) {

      case NotificationType.success:
        style = 'success';
        break;

      case NotificationType.warning:
        style = 'warning';
        break;

      case NotificationType.error:
        style = 'error';
        break;

      default:
        style = 'info';
        break;
    }

    return style;
  }

  private addNotification(notification: Notification): void {
    this.notifications.push(notification);
    if (notification.timeout !== 0) {
      setTimeout(() => this.close(notification), notification.timeout);
    }
    this.changeDetectorRef.markForCheck();
  }
}
