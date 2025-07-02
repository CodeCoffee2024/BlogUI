import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { IndexComponent } from './index/index.component';
import { PostComponent } from './post/post.component';
import { CategoryComponent } from './category/category.component';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { SideNavComponent } from '../shared/components/client/side-nav/side-nav.component';


@NgModule({
  declarations: [
    DashboardComponent,
    IndexComponent,
    PostComponent,
    CategoryComponent,
    AboutComponent,
    ContactUsComponent,
    SideNavComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
