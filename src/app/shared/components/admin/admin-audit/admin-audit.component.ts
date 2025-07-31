import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-admin-audit',
	templateUrl: './admin-audit.component.html',
	styleUrls: ['./admin-audit.component.scss'],
})
export class AdminAuditComponent {
	@Input() entity;
	get createdBy() {
		return (
			this.entity.createdByUser.firstName +
			' ' +
			this.entity.createdByUser.lastName
		);
	}
	get updatedBy() {
		return (
			this.entity.updatedByUser.firstName +
			' ' +
			this.entity.updatedByUser.lastName
		);
	}
}
