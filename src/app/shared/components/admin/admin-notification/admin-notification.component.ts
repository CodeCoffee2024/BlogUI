import { Component } from '@angular/core';
import { NotificationService } from '../../../../core/services/notification.service';
import { Notification } from '../../../models/notification';

@Component({
	selector: 'app-admin-notification',
	templateUrl: './admin-notification.component.html',
	styleUrls: ['./admin-notification.component.scss'],
})
export class AdminNotificationComponent {
	notifications: Notification[] = [];
	constructor(
		private notificationService: NotificationService
	) {
		this.notificationService.notification$.subscribe(
			(notification) => {
				console.log(notification);
				if (notification) {
					this.notifications.push(notification);

					const interval = setInterval(() => {
						notification.timeLeft -= 10;
						if (notification.timeLeft <= 0) {
							clearInterval(interval);
							this.remove(
								this.notifications.indexOf(notification)
							);
						}
					}, 10);
				}
			}
		);
	}

	remove(index: number) {
		this.notifications.splice(index, 1);
	}
}
