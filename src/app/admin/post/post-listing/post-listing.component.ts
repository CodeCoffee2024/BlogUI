import { Component, OnInit } from '@angular/core';
import { GenericComponent } from '../../../core/generics/generic-component';
import { PostListingOption } from './post.listing.option';
import {
	AdminHeaderNav,
	AdminNavItem,
} from '../../../shared/models/nav.config';
import { PostDto } from '../models/post';
import { StatusDto } from '../../../shared/dtos/status.dto';
import { PostService } from '../post.service';
import { LoadingService } from '../../../core/services/loading.service';
import { ToastService } from '../../../core/services/toast.service';
import { TitleService } from '../../../core/services/title.service';
import { AdminPage } from '../../../shared/models/page';
import { finalize, forkJoin } from 'rxjs';

@Component({
	selector: 'app-post-listing',
	templateUrl: './post-listing.component.html',
	styleUrls: ['./post-listing.component.scss'],
})
export class PostListingComponent
	extends GenericComponent<PostListingOption>
	implements OnInit
{
	navigations: AdminNavItem[] = [];
	list: PostDto[];
	listingData;
	statuses: StatusDto[];
	constructor(
		private postService: PostService,
		private loadingService: LoadingService,
		private toastService: ToastService,
		private titleService: TitleService
	) {
		super();
		this.listingOption = new PostListingOption();
	}
	ngOnInit(): void {
		this.loadingService.show();
		this.navigations = [
			AdminHeaderNav.find(
				(it) => it.page === AdminPage.Post
			)!,
		];
		forkJoin({
			statuses: this.postService.getStatuses(),
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
						'Failed to load post data';
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
			list: this.postService.getList(this.listingOption),
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
					this.titleService.setTitle('Posts');
				},
				error: (error) => {
					const message =
						error?.error?.error?.description ??
						'Failed to load post data';
					this.toastService.error(message);
				},
			});
	}
}
