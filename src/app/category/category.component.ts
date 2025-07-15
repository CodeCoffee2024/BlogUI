import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CategoryResponse } from '../dashboard/models/category';
import { PostDashboardResponse, PostResponse } from '../dashboard/models/post';
import { SideNavService } from '../shared/components/client/side-nav/side-nav.service';
import { DashboardService } from '../dashboard/dashboard.service';
import { LoadingService } from '../core/services/loading.service';
import { ToastService } from '../core/services/toast.service';
import { ScreenSizeService } from '../shared/services/screen-size.service';
import { DomSanitizer } from '@angular/platform-browser';
import { getImage } from '../shared/utils/file.util';
import { finalize, forkJoin } from 'rxjs';
import { Page } from '../shared/models/page';
import { HeaderNav, NavItem } from '../shared/models/nav.config';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from './category.service';
import { GenericListingResult } from '../shared/models/api-result.model';
import { environment } from '../../../environment';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  navigations: NavItem[] = [];
  categories: CategoryResponse[]=[];
  page = 1;
  currentNavigation = ''
  isMobile = false;
  isTablet = false;
  categoryName = '';
  posts: PostResponse[];
  totalCount = 0;
  listingData;
  constructor(
    public sideNavService: SideNavService,
    private categoryService: CategoryService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private screenSizeService: ScreenSizeService,
    private sanitizer: DomSanitizer,
    private activatedRoute: ActivatedRoute
  ) {}
  getSafeImage(path: string) {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${this.getImage(path)})`);
  }
  getImage(file) {
    return getImage(file);
  }
  ngOnInit(): void {
    this.loadingService.show();

    this.navigations = [
      HeaderNav.find(it => it.page === Page.Home)!,
      HeaderNav.find(it => it.page === Page.Categories)!
    ];

    this.activatedRoute.paramMap.subscribe(params => {
      this.categoryName = params.get('name') ?? '';

      this.navigations = [
        ...this.navigations,
        {
          page: Page.None,
          label: this.categoryName,
          link: ''
        }
      ];
    });
    this.load(this.page);
  }
  load(page) {
    this.categoryService.getPostByCategory(this.categoryName, page)
      .pipe(
        finalize(() => this.loadingService.hide())
      )
      .subscribe({
        next: (res) => {
          this.posts = (res.data?.items || []).flat() ?? [];
          this.listingData = res.data;
          this.totalCount = res.data['totalCount'];
        },
        error: () => {
          this.toastService.error('Failed to load posts.');
        }
      });
  }

  onPageChange(page) {
    this.loadingService.show();
    this.load(page);
  }

  getCategories(categories) {
    this.categories = categories;
  }
  getLink(categoryName) {
    return environment.uiUrl+'category/'+categoryName;
  }
}