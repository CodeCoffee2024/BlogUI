import { Component, OnInit } from '@angular/core';
import { RoleForm } from '../models/role';
import {
	AdminHeaderNav,
	AdminNavItem,
} from '../../../shared/models/nav.config';
import {
	AdminPage,
	Page,
} from '../../../shared/models/page';
import { PermissionService } from '../../permission/permission.service';
import { LoadingService } from '../../../core/services/loading.service';
import { finalize, forkJoin } from 'rxjs';
import { GenericComponent } from '../../../core/generics/generic-component';
import { PermissionData } from '../../permission/models/permission';
import { ToastService } from '../../../core/services/toast.service';
import { RoleService } from '../role.service';
import { FormErrorService } from '../../../core/services/form-error.service';
import { Router } from '@angular/router';
import { TitleService } from '../../../core/services/title.service';

@Component({
	selector: 'app-role-new',
	templateUrl: './role-new.component.html',
	styleUrls: ['./role-new.component.scss'],
})
export class RoleNewComponent
	extends GenericComponent<null>
	implements OnInit
{
	form: RoleForm = new RoleForm();
	permissions: PermissionData[];
	navigations: AdminNavItem[] = [];
	constructor(
		private permissionService: PermissionService,
		private loadingService: LoadingService,
		private route: Router,
		private toastService: ToastService,
		private titleService: TitleService
	) {
		super();
		this.navigations = [
			AdminHeaderNav.find(
				(it) => it.page === AdminPage.Role
			)!,
			{
				page: AdminPage.None,
				label: 'New',
				link: '',
			},
		];
		this.titleService.setTitle('Roles - New');
	}
	ngOnInit(): void {
		this.loadingService.show();
		this.isLoading = true;
		forkJoin({
			list: this.permissionService.getAllPermissions(),
		})
			.pipe(
				finalize(() => {
					this.loadingService.hide();
					this.isLoading = false;
				})
			)
			.subscribe({
				next: (res) => {
					this.permissions = res.list.data;
					console.log(this.permissions);
				},
				error: (error) => {
					const message =
						error?.error?.error?.description ??
						'Failed to load permission data';
					this.toastService.error(message);
				},
			});
	}
	onSubmit(id) {
		this.route.navigate(['admin/roles/' + id]);
	}
}
