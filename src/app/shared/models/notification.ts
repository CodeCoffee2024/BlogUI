export enum NotificationType {
	SUCCESS,
	ERROR,
	WARNING,
}
export class NotificationTypeTitle {
	static readonly titles = {
		[NotificationType.SUCCESS]: 'Success',
	};
}

export class Notification {
	title: string;
	message: string;
	type: NotificationType;
	duration?: number;
	timeLeft = 0;
	get class() {
		switch (this.type) {
			case NotificationType.SUCCESS:
				return 'bg-success text-white';
			case NotificationType.ERROR:
				return 'bg-danger text-white';
			case NotificationType.WARNING:
				return 'bg-warning text-white';
			default:
				return 'bg-warning';
		}
	}
}
