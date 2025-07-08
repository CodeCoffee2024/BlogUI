import { Component, Input } from '@angular/core';
import { HeaderNav } from '../../../models/nav.config';

@Component({
  selector: 'app-header-nav',
  templateUrl: './header-nav.component.html',
  styleUrls: ['./header-nav.component.scss']
})
export class HeaderNavComponent {
  @Input() navs: string[] = [];
  HeaderNav = HeaderNav;
  currentNav(nav: string) {
    const navigation = HeaderNav.find(it => it.page == nav);
    return navigation ?? null;
  }
}
