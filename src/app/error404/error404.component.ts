import { Component, OnInit } from '@angular/core';
import { SideNavService } from '../shared/components/client/side-nav/side-nav.service';

@Component({
	selector: 'app-error404',
	templateUrl: './error404.component.html',
	styleUrls: ['./error404.component.scss'],
})
export class Error404Component {
	currentIndex = 0;
	isMobile = false;
	isTablet = false;
	groupedPosts: any[][] = [];
	postsPerSlide = 1;
	currentSlideIndex = 0;
	bootstrap: any;
	constructor(public sideNavService: SideNavService) {}
}
