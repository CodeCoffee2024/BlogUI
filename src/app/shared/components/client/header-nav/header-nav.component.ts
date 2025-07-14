import { Component, Input, OnInit } from '@angular/core';
import { HeaderNav, NavItem } from '../../../models/nav.config';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
})
export class HeaderNavComponent implements OnInit {
  @Input() navs: NavItem[] = [];
  HeaderNav = HeaderNav;
  currentNav(nav: string) {
    const navigation = HeaderNav.find(it => it.page == nav);
    return navigation ?? null;
  }
  ngOnInit(): void {
    console.log(this.navs)
  }
}
