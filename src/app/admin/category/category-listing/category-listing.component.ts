import { Component, OnInit } from '@angular/core';
import { GenericComponent } from '../../../core/generics/generic-component';
import { CategoryListingOption } from '../../category/category-listing/category.listing.option';
import {
	AdminHeaderNav,
	AdminNavItem,
} from '../../../shared/models/nav.config';
import { CategoryDto } from '../models/category';
import { StatusDto } from '../../../shared/dtos/status.dto';
import { CategoryService } from '../category.service';
import { LoadingService } from '../../../core/services/loading.service';
import { ToastService } from '../../../core/services/toast.service';
import { TitleService } from '../../../core/services/title.service';
import { AdminPage } from '../../../shared/models/page';
import { finalize, forkJoin } from 'rxjs';

@Component({
	selector: 'app-category-listing',
	templateUrl: './category-listing.component.html',
	styleUrls: ['./category-listing.component.scss'],
})
export class CategoryListingComponent
	extends GenericComponent<CategoryListingOption>
	implements OnInit
{
	navigations: AdminNavItem[] = [];
	list: CategoryDto[];
	listingData;
	statuses: StatusDto[];
	constructor(
		private categoryService: CategoryService,
		private loadingService: LoadingService,
		private toastService: ToastService,
		private titleService: TitleService
	) {
		super();
		this.listingOption = new CategoryListingOption();
	}
	ngOnInit(): void {
		this.loadingService.show();
		this.navigations = [
			AdminHeaderNav.find(
				(it) => it.page === AdminPage.Categories
			)!,
		];
		forkJoin({
			statuses: this.categoryService.getStatuses(),
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
						'Failed to load category data';
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
		this.listingOption.pageNumber = page;
		this.reload();
	}

	reload() {
		this.loadingService.show();
		this.isLoading = true;
		forkJoin({
			list: this.categoryService.getList(
				this.listingOption
			),
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
					this.listingData = res.list;
					this.titleService.setTitle('Categories');
				},
				error: (error) => {
					const message =
						error?.error?.error?.description ??
						'Failed to load category data';
					this.toastService.error(message);
				},
			});
	}
}
