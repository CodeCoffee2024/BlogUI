import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, forkJoin } from 'rxjs';
import { environment } from '../../../../../environment';
import { LoadingService } from '../../../core/services/loading.service';
import { NotificationService } from '../../../core/services/notification.service';
import { TitleService } from '../../../core/services/title.service';
import { ToastService } from '../../../core/services/toast.service';
import {
	AdminHeaderNav,
	AdminNavItem,
} from '../../../shared/models/nav.config';
import {
	NotificationType,
	NotificationTypeTitle,
} from '../../../shared/models/notification';
import { AdminPage } from '../../../shared/models/page';
import { ToastType } from '../../../shared/models/toast';
import { PostConstants, PostDto } from '../models/post';
import { PostService } from '../post.service';

@Component({
	selector: 'app-post-show',
	templateUrl: './post-show.component.html',
	styleUrls: ['./post-show.component.scss'],
})
export class PostShowComponent implements OnInit {
	navigations: AdminNavItem[] = [];
	imgPath = environment.folderPath;
	id: string;
	isLoading = true;
	post: PostDto = new PostDto();
	constructor(
		private postService: PostService,
		private loadingService: LoadingService,
		private toastService: ToastService,
		private activatedRoute: ActivatedRoute,
		private notificationService: NotificationService,
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
					];
					this.navigations = [
						...this.navigations,
						{
							page: AdminPage.None,
							label: this.post.title,
							link: '',
						},
					];
					this.titleService.setTitle(
						'Posts - ' + this.post.title
					);
				},
				error: (error) => {
					const message =
						error?.error?.error?.description ??
						'Failed to load post data';
					this.toastService.error(message);
					if (error.status == 404) {
						this.route.navigate(['admin/posts']);
					}
				},
			});
	}
	delete() {
		this.toastService
			.confirm(
				ToastType.CONFIRMATION,
				PostConstants.DELETECONFIRMATION
			)
			.then((it) => {
				if (it) {
					this.postService
						.remove(this.post.id)
						.subscribe(() => {
							this.route.navigate(['admin/posts']);
							this.notificationService.add(
								NotificationTypeTitle.titles[
									NotificationType.SUCCESS
								],
								PostConstants.DELETESUCCESS,
								NotificationType.SUCCESS
							);
						});
				}
			});
	}
}
