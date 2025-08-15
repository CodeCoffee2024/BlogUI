import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, forkJoin } from 'rxjs';
import { LoadingService } from '../../../core/services/loading.service';
import { NotificationService } from '../../../core/services/notification.service';
import { TitleService } from '../../../core/services/title.service';
import { ToastService } from '../../../core/services/toast.service';
import {
	AdminHeaderNav,
	AdminNavItem,
} from '../../../shared/models/nav.config';
import {
	NotificationType,
	NotificationTypeTitle,
} from '../../../shared/models/notification';
import { AdminPage } from '../../../shared/models/page';
import { ToastType } from '../../../shared/models/toast';
import {
	PermissionData,
	PermissionUtil,
} from '../../permission/models/permission';
import { PermissionService } from '../../permission/permission.service';
import { RoleConstants, RoleDto } from '../models/role';
import { RoleService } from '../role.service';

@Component({
	selector: 'app-role-show',
	templateUrl: './role-show.component.html',
	styleUrls: ['./role-show.component.scss'],
})
export class RoleShowComponent implements OnInit {
	navigations: AdminNavItem[] = [];
	id: string;
	isLoading = true;
	role: RoleDto = new RoleDto();
	permissions: PermissionData[];
	constructor(
		private roleService: RoleService,
		private loadingService: LoadingService,
		private toastService: ToastService,
		private permissionService: PermissionService,
		private activatedRoute: ActivatedRoute,
		private notificationService: NotificationService,
		private route: Router,
		private titleService: TitleService
	) {}
	ngOnInit(): void {
		this.activatedRoute.paramMap.subscribe((params) => {
			const id = params.get('id') ?? '';
			this.load(id);
		});
	}
	load(id) {
		this.loadingService.show();
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
					];
					this.navigations = [
						...this.navigations,
						{
							page: AdminPage.None,
							label: this.role.name,
							link: '',
						},
					];
					this.titleService.setTitle(
						'Roles - ' + this.role.name
					);
				},
				error: (error) => {
					const message =
						error?.error?.error?.description ??
						'Failed to load role data';
					this.toastService.error(message);
					if (error.status == 404) {
						this.route.navigate(['admin/roles']);
					}
				},
			});
	}
	get permissionGroup() {
		return PermissionUtil.groupPermissions(
			this.permissions
		);
	}
	isPermissionSelected(permissionId: string): boolean {
		const permissions = this.role.permissions.map(
			(it) => it.id
		);
		return permissions.includes(permissionId);
	}
	delete() {
		this.toastService
			.confirm(
				ToastType.CONFIRMATION,
				RoleConstants.DELETECONFIRMATION
			)
			.then((it) => {
				if (it) {
					this.roleService
						.remove(this.role.id)
						.subscribe(() => {
							this.route.navigate(['admin/roles']);
							this.notificationService.add(
								NotificationTypeTitle.titles[
									NotificationType.SUCCESS
								],
								RoleConstants.DELETESUCCESS,
								NotificationType.SUCCESS
							);
						});
				}
			});
	}
}
