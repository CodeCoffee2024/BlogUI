import { AfterViewInit, Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { SideNavService } from '../shared/components/client/side-nav/side-nav.service';
import { LoadingService } from '../core/services/loading.service';
import { debounceTime, finalize, forkJoin, fromEvent, Subscription } from 'rxjs';
import { ToastService } from '../core/services/toast.service';
import { CategoryResponse } from './models/category';
import { PostDashboardResponse, } from './models/post';
import { DashboardService } from './dashboard.service';
import { getImage } from '../shared/utils/file.util';
import { ScreenSizeService } from '../shared/services/screen-size.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  currentIndex = 0;
  isMobile = false;
  isTablet = false;
  posts: PostDashboardResponse;
  groupedPosts: any[][] = [];
  postsPerSlide = 1;
  currentSlideIndex = 0;
  bootstrap: any; // Bootstrap JS needs this if types are not available
  constructor(
    public sideNavService: SideNavService,
    private dashboardService: DashboardService,
    private loadingService: LoadingService,
    private toastService: ToastService,
    private screenSizeService: ScreenSizeService,
    private sanitizer: DomSanitizer
  ) {}
  ngAfterViewInit(): void {
    const carousel = document.getElementById('top4Carousel');
    if (carousel) {
      carousel.addEventListener('slid.bs.carousel', (event: any) => {
        this.currentSlideIndex = event.to;
      });
    }
  }
getSafeImage(path: string) {
  return this.sanitizer.bypassSecurityTrustStyle(`url(${this.getImage(path)})`);
}
  get top4() {
    return this.posts?.top4;
  }
  get top2() {
    return this.posts?.top2;
  }
  get highlights() {
    return this.posts?.highlights;
  }
  get latest() {
    return this.posts?.latest;
  }
  getImage(file) {
    return getImage(file);
  }
  ngOnInit(): void {
    this.loadingService.show();

    forkJoin({
      posts: this.dashboardService.getPosts()
    })
    .pipe(finalize(() => this.loadingService.hide()))
    .subscribe({
      next: (res) => {
        this.posts = res.posts?.data ?? null;

        this.screenSizeService.screenSize$.subscribe(size => {
          switch(size) {
            case 'mobile':
              this.isMobile = true;
              this.postsPerSlide = 1;
              break;
            case 'tablet':
              this.isMobile = false;
              this.isTablet = true;
              this.postsPerSlide = 3;
              break;
            case 'desktop':
              this.isMobile = false;
              this.isTablet = false;
              this.postsPerSlide = 4;
              break;
          }
          this.groupPosts();
        });
      },
      error: (error) => {
        const message = error?.error?.error?.description ?? 'Failed to load dashboard data';
        this.toastService.error(message);
      }
    });
  }

  groupPosts() {
    this.groupedPosts = [];
    for (let i = 0; i < this.top4.length; i += this.postsPerSlide) {
      this.groupedPosts.push(this.top4.slice(i, i + this.postsPerSlide));
    }
  }
}