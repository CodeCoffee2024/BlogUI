import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, forkJoin } from 'rxjs';
import { GenericComponent } from '../../../core/generics/generic-component';
import { LoadingService } from '../../../core/services/loading.service';
import { TitleService } from '../../../core/services/title.service';
import { ToastService } from '../../../core/services/toast.service';
import {
	AdminHeaderNav,
	AdminNavItem,
} from '../../../shared/models/nav.config';
import { AdminPage } from '../../../shared/models/page';
import {
	PostDto,
	PostForm,
	PostModel,
} from '../models/post';
import { PostService } from '../post.service';

@Component({
	selector: 'app-post-update',
	templateUrl: './post-update.component.html',
	styleUrls: ['./post-update.component.scss'],
})
export class PostUpdateComponent
	extends GenericComponent<null>
	implements OnInit
{
	id: string;
	post: PostDto = new PostDto();
	form: PostForm = new PostForm();
	navigations: AdminNavItem[] = [];
	constructor(
		private postService: PostService,
		private loadingService: LoadingService,
		private route: Router,
		private toastService: ToastService,
		private activatedRoute: ActivatedRoute,
		private titleService: TitleService
	) {
		super();
	}
	ngOnInit(): void {
		this.activatedRoute.paramMap.subscribe((params) => {
			this.id = params.get('id') ?? '';
			this.load(this.id);
		});
	}
	load(id) {
		this.loadingService.show();
		this.isLoading = true;
		forkJoin({
			post: this.postService.getPostById(id),
		})
			.pipe(
				finalize(() => {
					this.loadingService.hide();
					this.isLoading = false;
				})
			)
			.subscribe({
				next: (res) => {
					this.post = res.post.data;
					this.navigations = [
						AdminHeaderNav.find(
							(it) => it.page === AdminPage.Post
						)!,
						{
							page: AdminPage.None,
							label: this.post.title,
							link: '/posts/' + this.post.id,
						},
					];
					this.navigations = [
						...this.navigations,
						{
							page: AdminPage.None,
							label: 'Update',
							link: '',
						},
					];
					this.titleService.setTitle(
						'Posts - ' + this.post.title + ' Update'
					);
					var model = new PostModel();
					model.categoryId = this.post.category.id;
					model.category = this.post.category;
					model.createdBy = this.post.createdBy;
					model.createdOn = this.post.createdOn;
					model.description = this.post.description;
					model.id = this.post.id;
					model.img = this.post.imgPath;
					model.tags =
						this.post.tags?.map((it) => it.name) || [];
					model.title = this.post.title;
					model.updatedBy = this.post.updatedBy;
					model.updatedOn = this.post.updatedOn;
					this.form.fillForm(model);
				},
				error: (error) => {
					const message =
						error?.error?.error?.description ??
						'Failed to load permission data';
					this.toastService.error(message);
				},
			});
	}
	onSubmit(id) {
		this.route.navigate(['admin/posts/' + id]);
	}
}
