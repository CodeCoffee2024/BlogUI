import { Component, Input, OnInit } from '@angular/core';
import { SideNavService } from '../side-nav/side-nav.service';
import { CategoryResponse } from '../../../../dashboard/models/category';
import { DashboardService } from '../../../../dashboard/dashboard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isCategoryOpen: boolean = false;
  @Input() categories: CategoryResponse[] = [];
  constructor(
    public sideNavService: SideNavService,
    private dashboardService: DashboardService
  ) {

  }
  ngOnInit() {
    this.dashboardService.getCategories().subscribe({
      next: (res) =>{
        this.categories = res?.data ?? [];
      }
    });
  }
}
