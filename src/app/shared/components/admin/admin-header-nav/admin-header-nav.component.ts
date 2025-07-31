import { Component, Input, OnInit } from '@angular/core';
import {
	AdminHeaderNav,
	AdminNavItem,
} from '../../../models/nav.config';
import { Router } from '@angular/router';

@Component({
	selector: 'app-admin-header-nav',
	templateUrl: './admin-header-nav.component.html',
	styleUrls: ['./admin-header-nav.component.scss'],
})
export class AdminHeaderNavComponent implements OnInit {
	@Input() navs: AdminNavItem[] = [];
	AdminHeaderNav = AdminHeaderNav;
	constructor(private router: Router) {}
	currentNav(nav: string) {
		const navigation = AdminHeaderNav.find(
			(it) => it.page == nav
		);
		return navigation ?? null;
	}
	ngOnInit(): void {
		console.log(this.navs);
	}
	goTo(link) {
		return 'admin' + link;
	}
}
