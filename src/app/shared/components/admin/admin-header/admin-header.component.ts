import {
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';

@Component({
	selector: 'app-admin-header',
	templateUrl: './admin-header.component.html',
	styleUrls: ['./admin-header.component.scss'],
})
export class AdminHeaderComponent {
	@Input() isSidebarOpen = false;
	@Input() isDesktop = false;
	@Output() toggleSidebar = new EventEmitter<void>();
	onToggle(): void {
		this.toggleSidebar.emit();
	}
}
