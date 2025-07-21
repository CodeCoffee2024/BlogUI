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
	],
	imports: [CommonModule, RouterModule],
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
	],
})
export class SharedModule {}
