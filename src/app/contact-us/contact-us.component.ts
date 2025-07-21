import { Component, OnInit } from '@angular/core';
import {
	HeaderNav,
	NavItem,
} from '../shared/models/nav.config';
import { LoadingService } from '../core/services/loading.service';
import { ToastService } from '../core/services/toast.service';
import { ScreenSizeService } from '../shared/services/screen-size.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Page } from '../shared/models/page';
import { SideNavService } from '../shared/components/client/side-nav/side-nav.service';

@Component({
	selector: 'app-contact-us',
	templateUrl: './contact-us.component.html',
	styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {
	navigations: NavItem[] = [];
	currentNavigation = '';
	isMobile = false;
	isLoading = true;
	isTablet = false;
	constructor(
		public sideNavService: SideNavService,
		private loadingService: LoadingService,
		private toastService: ToastService,
		private screenSizeService: ScreenSizeService,
		private sanitizer: DomSanitizer
	) {}
	ngOnInit(): void {
		this.navigations = [
			HeaderNav.find((it) => it.page === Page.Home)!,
			HeaderNav.find((it) => it.page === Page.Contact)!,
		];
	}
}
