import { Component, OnInit } from '@angular/core';
import { GenericComponent } from '../../../core/generics/generic-component';
import { RoleDto, RoleForm } from '../models/role';
import { PermissionData } from '../../permission/models/permission';
import {
	AdminHeaderNav,
	AdminNavItem,
} from '../../../shared/models/nav.config';
import { PermissionService } from '../../permission/permission.service';
import { LoadingService } from '../../../core/services/loading.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast.service';
import { AdminPage } from '../../../shared/models/page';
import { finalize, forkJoin } from 'rxjs';
import { RoleService } from '../role.service';

@Component({
	selector: 'app-role-update',
	templateUrl: './role-update.component.html',
	styleUrls: ['./role-update.component.scss'],
})
export class RoleUpdateComponent
	extends GenericComponent<null>
	implements OnInit
{
	id: string;
	role: RoleDto = new RoleDto();
	form: RoleForm = new RoleForm();
	permissions: PermissionData[];
	navigations: AdminNavItem[] = [];
	constructor(
		private permissionService: PermissionService,
		private roleService: RoleService,
		private loadingService: LoadingService,
		private route: Router,
		private toastService: ToastService,
		private activatedRoute: ActivatedRoute
	) {
		super();
	}
	ngOnInit(): void {
		this.activatedRoute.paramMap.subscribe((params) => {
			this.id = params.get('id') ?? '';
			this.load(this.id);
		});
	}
	load(id) {
		this.loadingService.show();
		this.isLoading = true;
		forkJoin({
			list: this.permissionService.getAllPermissions(),
			role: this.roleService.getRoleById(id),
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
					this.role = res.role.data;
					this.navigations = [
						AdminHeaderNav.find(
							(it) => it.page === AdminPage.Role
						)!,
						{
							page: AdminPage.None,
							label: this.role.name,
							link: '/roles/' + this.role.id,
						},
					];
					this.navigations = [
						...this.navigations,
						{
							page: AdminPage.None,
							label: 'Update',
							link: '',
						},
					];
					this.form.fillForm(this.role);
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
