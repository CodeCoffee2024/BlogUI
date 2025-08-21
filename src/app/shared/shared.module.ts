import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
	FormsModule,
	ReactiveFormsModule,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgxEchartsModule } from 'ngx-echarts';
import { AdminAuditComponent } from './components/admin/admin-audit/admin-audit.component';
import { AdminHeaderNavComponent } from './components/admin/admin-header-nav/admin-header-nav.component';
import { AdminHeaderComponent } from './components/admin/admin-header/admin-header.component';
import { AdminNotificationComponent } from './components/admin/admin-notification/admin-notification.component';
import { AdminSidebarComponent } from './components/admin/admin-sidebar/admin-sidebar.component';
import { AdminSoloSelectDropdownComponent } from './components/admin/admin-solo-select-dropdown/admin-solo-select-dropdown.component';
import { ChartComponent } from './components/admin/chart/chart.component';
import { ImageUploadComponent } from './components/admin/image-upload/image-upload.component';
import { ListingHeaderComponent } from './components/admin/listing-header/listing-header.component';
import { ListingPaginationComponent } from './components/admin/listing-pagination/listing-pagination.component';
import { HeaderNavComponent } from './components/client/header-nav/header-nav.component';
import { HeaderComponent } from './components/client/header/header.component';
import { SideNavComponent } from './components/client/side-nav/side-nav.component';
import { InputComponent } from './components/input/input.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { PostTemplateComponent } from './components/post-template/post-template.component';
import { StatusLabelsComponent } from './components/status-labels/status-labels.component';
import { NullablePipe } from './pipes/nullable.pipe';
import { TruncatePipe } from './pipes/truncate.pipe';

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
		NullablePipe,
		AdminSoloSelectDropdownComponent,
		ImageUploadComponent,
		InputComponent,
		ChartComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		ReactiveFormsModule,
		FormsModule,
		NgxEchartsModule.forRoot({
			echarts: () => import('echarts'),
		}),
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
		NullablePipe,
		AdminSoloSelectDropdownComponent,
		ImageUploadComponent,
		InputComponent,
		ChartComponent,
	],
})
export class SharedModule {}
