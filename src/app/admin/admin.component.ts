import {
	Component,
	HostListener,
	OnInit,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
	selector: 'app-admin',
	templateUrl: './admin.component.html',
	styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
	isSidebarOpen = false;
	isDesktop = false;

	constructor(private router: Router) {}

	ngOnInit() {
		this.checkScreenSize();
	}

	@HostListener('window:resize', ['$event'])
	onResize(event: any) {
		this.checkScreenSize();
	}

	checkScreenSize(): void {
		this.isDesktop = window.innerWidth >= 1024;
		if (this.isDesktop) {
			this.isSidebarOpen = true;
		} else {
			this.isSidebarOpen = false;
		}
		console.log(this.isDesktop);
	}

	toggleSidebar(): void {
		this.isSidebarOpen = !this.isSidebarOpen;
	}

	closeSidebar(): void {
		if (!this.isDesktop) {
			this.isSidebarOpen = false;
		}
	}
}
