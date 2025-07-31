import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './components/client/side-nav/side-nav.component';
import { HeaderComponent } from './components/client/header/header.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { PostTemplateComponent } from './components/post-template/post-template.component';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from './components/pagination/pagination.component';
import { HeaderNavComponent } from './components/client/header-nav/header-nav.component';
import { AdminSidebarComponent } from './components/admin/admin-sidebar/admin-sidebar.component';
import { AdminHeaderComponent } from './components/admin/admin-header/admin-header.component';
import { AdminHeaderNavComponent } from './components/admin/admin-header-nav/admin-header-nav.component';
import { ListingHeaderComponent } from './components/admin/listing-header/listing-header.component';
import {
	FormsModule,
	ReactiveFormsModule,
} from '@angular/forms';
import { StatusLabelsComponent } from './components/status-labels/status-labels.component';
import { ListingPaginationComponent } from './components/admin/listing-pagination/listing-pagination.component';
import { AdminAuditComponent } from './components/admin/admin-audit/admin-audit.component';
import { AdminNotificationComponent } from './components/admin/admin-notification/admin-notification.component';

@NgModule({
	declarations: [
		SideNavComponent,
		HeaderComponent,
		TruncatePipe,
		PostTemplateComponent,
		PaginationComponent,
		HeaderNavComponent,
		AdminSidebarComponent,
		AdminHeaderComponent,
		AdminHeaderNavComponent,
		ListingHeaderComponent,
		StatusLabelsComponent,
		ListingPaginationComponent,
		AdminAuditComponent,
		AdminNotificationComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		ReactiveFormsModule,
		FormsModule,
	],
	exports: [
		SideNavComponent,
		HeaderComponent,
		TruncatePipe,
		PostTemplateComponent,
		RouterModule,
		PaginationComponent,
		HeaderNavComponent,
		AdminSidebarComponent,
		AdminHeaderComponent,
		AdminHeaderNavComponent,
		ListingHeaderComponent,
		ReactiveFormsModule,
		FormsModule,
		StatusLabelsComponent,
		ListingPaginationComponent,
		AdminAuditComponent,
		AdminNotificationComponent,
	],
})
export class SharedModule {}
