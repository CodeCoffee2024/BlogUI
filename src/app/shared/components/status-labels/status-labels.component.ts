import { Component, Input } from '@angular/core';
import { StatusBadge } from '../../dtos/status.dto';

@Component({
	selector: 'app-status-labels',
	templateUrl: './status-labels.component.html',
	styleUrls: ['./status-labels.component.scss'],
})
export class StatusLabelsComponent {
	@Input() status;
	StatusBadge = StatusBadge;
}
