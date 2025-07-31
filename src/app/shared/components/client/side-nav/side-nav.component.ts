import {
	Component,
	HostListener,
	Input,
	Output,
	EventEmitter,
} from '@angular/core';
import { CategoryResponse } from '../../../../dashboard/models/category';
import { environment } from '../../../../../../environment';
import { DashboardService } from '../../../../dashboard/dashboard.service';

@Component({
	selector: 'app-side-nav',
	templateUrl: './side-nav.component.html',
	styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent {
	isCategoryOpen: boolean = false;
	@Input() isOpen = false;
	@Output() closed = new EventEmitter<void>();
	categories: CategoryResponse[] = [];

	isMobile = false;
	isTablet = false;
	isDesktop = false;

	maxTabletWidth = 768;
	desktopWidth = 1024;
	constructor(private dashboardService: DashboardService) {}
	ngOnInit() {
		this.dashboardService.getCategories().subscribe({
			next: (res) => {
				this.categories = res?.data ?? [];
			},
		});
		this.checkScreenSize();
	}

	@HostListener('window:resize')
	checkScreenSize() {
		const width = window.innerWidth;
		this.isMobile = width < this.maxTabletWidth;
		this.isTablet =
			width >= this.maxTabletWidth &&
			width < this.desktopWidth;
		this.isDesktop = width >= this.desktopWidth;

		if (this.isDesktop && this.isOpen) {
			this.close();
		}
	}
	getLink(category) {
		return environment.uiUrl + 'category/' + category;
	}

	close() {
		this.isOpen = false;
		this.closed.emit();
	}

	preventClose(event: Event) {
		event.stopPropagation();
	}
}
