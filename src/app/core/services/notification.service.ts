import { Injectable } from '@angular/core';
import {
	Notification,
	NotificationType,
} from '../../shared/models/notification';
import { BehaviorSubject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class NotificationService {
	notification: Notification = null;
	CONFIG_NOTIFICATION_DURATION_SECONDS = 3;
	private notificationSubject =
		new BehaviorSubject<Notification>(this.notification);
	notification$ = this.notificationSubject.asObservable();

	add(
		title: string,
		message: string,
		type: NotificationType
	) {
		const notification = new Notification();
		notification.title = title;
		notification.message = message;
		notification.type = type;
		notification.duration =
			this.CONFIG_NOTIFICATION_DURATION_SECONDS * 1000;
		notification.timeLeft = notification.duration;
		this.notificationSubject.next(notification);
	}
}
