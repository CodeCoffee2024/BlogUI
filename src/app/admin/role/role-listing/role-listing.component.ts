import { Component, OnInit } from '@angular/core';
import { RoleService } from '../role.service';
import { GenericComponent } from '../../../core/generics/generic-component';
import { RoleListingOption } from './role.listing.option';
import { finalize, forkJoin } from 'rxjs';
import { LoadingService } from '../../../core/services/loading.service';
import { RoleDto } from '../models/role';
import { ListingData } from '../../../shared/models/api-result.model';
import { ToastService } from '../../../core/services/toast.service';
import {
	AdminHeaderNav,
	AdminNavItem,
	HeaderNav,
	NavItem,
} from '../../../shared/models/nav.config';
import {
	AdminPage,
	Page,
} from '../../../shared/models/page';
import {
	StatusBadge,
	StatusDto,
} from '../../../shared/dtos/status.dto';
import { Router } from '@angular/router';

@Component({
	selector: 'app-role-listing',
	templateUrl: './role-listing.component.html',
	styleUrls: ['./role-listing.component.scss'],
})
export class RoleListingComponent
	extends GenericComponent<RoleListingOption>
	implements OnInit
{
	navigations: AdminNavItem[] = [];
	list: ListingData<RoleDto[]>;
	listingData;
	statuses: StatusDto[];
	constructor(
		private roleService: RoleService,
		private loadingService: LoadingService,
		private toastService: ToastService,
		private router: Router
	) {
		super();
		this.listingOption = new RoleListingOption();
	}
	ngOnInit(): void {
		this.loadingService.show();
		this.navigations = [
			AdminHeaderNav.find(
				(it) => it.page === AdminPage.Role
			)!,
		];
		forkJoin({
			statuses: this.roleService.getStatuses(),
		})
			.pipe(
				finalize(() => {
					this.loadingService.hide();
					this.reload();
				})
			)
			.subscribe({
				next: (res) => {
					this.statuses = res.statuses.data;
				},
				error: (error) => {
					const message =
						error?.error?.error?.description ??
						'Failed to load dashboard data';
					this.toastService.error(message);
				},
			});
	}
	statusChange(status: string) {
		this.listingOption.status = status;
		this.reload();
	}
	searchChange(input: string) {
		this.listingOption.search = input;
		this.reload();
	}
	onPageChange(page) {
		this.listingOption.page = page;
		this.reload();
	}

	reload() {
		this.loadingService.show();
		this.isLoading = true;
		forkJoin({
			list: this.roleService.getList(this.listingOption),
		})
			.pipe(
				finalize(() => {
					this.loadingService.hide();
					this.isLoading = false;
				})
			)
			.subscribe({
				next: (res) => {
					this.list = res.list.data;
					this.listingData = res.list.data;
					console.log(this.listingData);
				},
				error: (error) => {
					const message =
						error?.error?.error?.description ??
						'Failed to load dashboard data';
					this.toastService.error(message);
				},
			});
	}
}
