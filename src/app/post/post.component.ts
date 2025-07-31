import { Component, OnInit } from '@angular/core';
import {
	HeaderNav,
	NavItem,
} from '../shared/models/nav.config';
import { PostResponse } from '../dashboard/models/post';
import { SideNavService } from '../shared/components/client/side-nav/side-nav.service';
import { CategoryService } from '../category/category.service';
import { LoadingService } from '../core/services/loading.service';
import { ToastService } from '../core/services/toast.service';
import { ScreenSizeService } from '../shared/services/screen-size.service';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { getImage } from '../shared/utils/file.util';
import { Page } from '../shared/models/page';
import { PostService } from './post.service';
import { finalize } from 'rxjs';

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
	navigations: NavItem[] = [];
	currentNavigation = '';
	isMobile = false;
	isLoading = true;
	isTablet = false;
	post: PostResponse;
	constructor(
		public sideNavService: SideNavService,
		private postService: PostService,
		private loadingService: LoadingService,
		private toastService: ToastService,
		private screenSizeService: ScreenSizeService,
		private sanitizer: DomSanitizer,
		private activatedRoute: ActivatedRoute
	) {}
	getSafeImage(path: string) {
		return this.sanitizer.bypassSecurityTrustStyle(
			`url(${this.getImage(path)})`
		);
	}
	getImage(file) {
		return getImage(file);
	}
	ngOnInit(): void {
		this.screenSizeService.screenSize$.subscribe((size) => {
			switch (size) {
				case 'mobile':
					this.isMobile = true;
					break;
				default:
					this.isMobile = false;
					break;
			}
			this.isLoading = true;
			this.loadingService.show();

			this.navigations = [
				HeaderNav.find((it) => it.page === Page.Home)!,
			];

			this.activatedRoute.paramMap.subscribe((params) => {
				const id = params.get('id') ?? '';
				this.load(id);
			});
		});
	}
	load(id) {
		this.postService
			.getPostById(id)
			.pipe(
				finalize(() => {
					this.loadingService.hide();
					this.isLoading = false;
				})
			)
			.subscribe({
				next: (res) => {
					this.post = res.data;
					this.navigations = [
						...this.navigations,
						{
							page: Page.None,
							label: this.post.title,
							link: '',
						},
					];
				},
				error: () => {
					this.toastService.error('Failed to load post.');
				},
			});
	}
}
