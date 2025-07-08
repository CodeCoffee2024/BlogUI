import { Component, Input } from '@angular/core';
import { SideNavService } from '../side-nav/side-nav.service';
import { CategoryResponse } from '../../../../dashboard/models/category';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  isCategoryOpen: boolean = false;
  @Input() categories: CategoryResponse[] = [];
  constructor(
    public sideNavService: SideNavService
  ) {

  }
}
