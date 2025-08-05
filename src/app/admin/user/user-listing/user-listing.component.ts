import { Component, OnInit } from '@angular/core';
import { GenericComponent } from '../../../core/generics/generic-component';
import { UserListingOption } from './user.listing.option';
import {
	AdminHeaderNav,
	AdminNavItem,
} from '../../../shared/models/nav.config';
import { UserDto } from '../models/user';
import { ListingData } from '../../../shared/models/api-result.model';
import { StatusDto } from '../../../shared/dtos/status.dto';
import { UserService } from '../user.service';
import { LoadingService } from '../../../core/services/loading.service';
import { ToastService } from '../../../core/services/toast.service';
import { AdminPage } from '../../../shared/models/page';
import { finalize, forkJoin } from 'rxjs';

@Component({
	selector: 'app-user-listing',
	templateUrl: './user-listing.component.html',
	styleUrls: ['./user-listing.component.scss'],
})
export class UserListingComponent
	extends GenericComponent<UserListingOption>
	implements OnInit
{
	navigations: AdminNavItem[] = [];
	list: ListingData<UserDto[]>;
	listingData;
	statuses: StatusDto[];
	constructor(
		private userService: UserService,
		private loadingService: LoadingService,
		private toastService: ToastService
	) {
		super();
		this.listingOption = new UserListingOption();
	}
	ngOnInit(): void {
		this.loadingService.show();
		this.navigations = [
			AdminHeaderNav.find(
				(it) => it.page === AdminPage.User
			)!,
		];
		forkJoin({
			statuses: this.userService.getStatuses(),
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
						'Failed to load user data';
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
			list: this.userService.getList(this.listingOption),
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
				},
				error: (error) => {
					const message =
						error?.error?.error?.description ??
						'Failed to load user data';
					this.toastService.error(message);
				},
			});
	}
}
