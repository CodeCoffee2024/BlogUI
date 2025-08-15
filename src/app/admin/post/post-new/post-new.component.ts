import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GenericComponent } from '../../../core/generics/generic-component';
import { TitleService } from '../../../core/services/title.service';
import {
	AdminHeaderNav,
	AdminNavItem,
} from '../../../shared/models/nav.config';
import { AdminPage } from '../../../shared/models/page';
import { CategoryFragment } from '../../category/models/category';
import { PostForm } from '../models/post';

@Component({
	selector: 'app-post-new',
	templateUrl: './post-new.component.html',
	styleUrls: ['./post-new.component.scss'],
})
export class PostNewComponent extends GenericComponent<null> {
	form: PostForm = new PostForm();
	categories: CategoryFragment[] = [];
	navigations: AdminNavItem[] = [];
	constructor(
		private route: Router,
		private titleService: TitleService
	) {
		super();
		this.navigations = [
			AdminHeaderNav.find(
				(it) => it.page === AdminPage.Post
			)!,
			{
				page: AdminPage.None,
				label: 'New',
				link: '',
			},
		];
		this.titleService.setTitle('Posts - New');
	}
	onSubmit(id) {
		this.route.navigate(['admin/posts/' + id]);
	}
}
