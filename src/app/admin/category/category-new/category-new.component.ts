import { Component, OnInit } from '@angular/core';
import { GenericComponent } from '../../../core/generics/generic-component';
import { CategoryForm } from '../models/category';
import {
	AdminHeaderNav,
	AdminNavItem,
} from '../../../shared/models/nav.config';
import { PermissionService } from '../../permission/permission.service';
import { LoadingService } from '../../../core/services/loading.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast.service';
import { TitleService } from '../../../core/services/title.service';
import { AdminPage } from '../../../shared/models/page';
import { forkJoin } from 'rxjs';

@Component({
	selector: 'app-category-new',
	templateUrl: './category-new.component.html',
	styleUrls: ['./category-new.component.scss'],
})
export class CategoryNewComponent
	extends GenericComponent<null>
	implements OnInit
{
	form: CategoryForm = new CategoryForm();
	navigations: AdminNavItem[] = [];
	constructor(
		private loadingService: LoadingService,
		private route: Router,
		private titleService: TitleService
	) {
		super();
		this.navigations = [
			AdminHeaderNav.find(
				(it) => it.page === AdminPage.Categories
			)!,
			{
				page: AdminPage.None,
				label: 'New',
				link: '',
			},
		];
		this.titleService.setTitle('Categories - New');
	}
	ngOnInit(): void {
		this.loadingService.show();
	}
	onSubmit(id) {
		this.route.navigate(['admin/categories/' + id]);
	}
}
