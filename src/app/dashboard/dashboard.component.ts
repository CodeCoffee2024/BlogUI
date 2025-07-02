import { Component } from '@angular/core';
import { SideNavService } from '../shared/components/client/side-nav/side-nav.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor(public sideNavService: SideNavService) {

  }
}
