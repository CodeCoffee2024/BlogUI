import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() categoryResult: EventEmitter<CategoryResponse[]> = new EventEmitter<CategoryResponse[]>();
  constructor(
    public sideNavService: SideNavService,
    private dashboardService: DashboardService
  ) {

  }
  ngOnInit() {
    this.dashboardService.getCategories().subscribe({
      next: (res) =>{
        this.categories = res?.data ?? [];
        this.categoryResult.emit(this.categories);
      }
    });
  }
}
