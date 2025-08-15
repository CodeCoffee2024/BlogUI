import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, forkJoin } from 'rxjs';
import { LoadingService } from '../../../core/services/loading.service';
import { TitleService } from '../../../core/services/title.service';
import { ToastService } from '../../../core/services/toast.service';
import {
	AdminHeaderNav,
	AdminNavItem,
} from '../../../shared/models/nav.config';
import { AdminPage } from '../../../shared/models/page';
import { CategoryService } from '../category.service';
import { CategoryDto } from '../models/category';

@Component({
	selector: 'app-category-show',
	templateUrl: './category-show.component.html',
	styleUrls: ['./category-show.component.scss'],
})
export class CategoryShowComponent implements OnInit {
	navigations: AdminNavItem[] = [];
	id: string;
	isLoading = true;
	category: CategoryDto = new CategoryDto();
	constructor(
		private categoryService: CategoryService,
		private loadingService: LoadingService,
		private toastService: ToastService,
		private activatedRoute: ActivatedRoute,
		private route: Router,
		private titleService: TitleService
	) {}
	ngOnInit(): void {
		this.activatedRoute.paramMap.subscribe((params) => {
			const id = params.get('id') ?? '';
			this.load(id);
		});
	}
	load(id) {
		this.loadingService.show();
		forkJoin({
			category: this.categoryService.getCategoryById(id),
		})
			.pipe(
				finalize(() => {
					this.loadingService.hide();
					this.isLoading = false;
				})
			)
			.subscribe({
				next: (res) => {
					this.category = res.category.data;
					this.navigations = [
						AdminHeaderNav.find(
							(it) => it.page === AdminPage.Categories
						)!,
					];
					this.navigations = [
						...this.navigations,
						{
							page: AdminPage.None,
							label: this.category.name,
							link: '',
						},
					];
					this.titleService.setTitle(
						'Categories - ' + this.category.name
					);
				},
				error: (error) => {
					const message =
						error?.error?.error?.description ??
						'Failed to load category data';
					this.toastService.error(message);
					if (error.status == 404) {
						this.route.navigate(['admin/categories']);
					}
				},
			});
	}
}
