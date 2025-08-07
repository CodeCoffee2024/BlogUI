import { Component, OnInit } from '@angular/core';
import {
	AdminHeaderNav,
	AdminNavItem,
} from '../../../shared/models/nav.config';
import { UserConstants, UserDto } from '../models/user';
import { UserService } from '../user.service';
import { LoadingService } from '../../../core/services/loading.service';
import { ToastService } from '../../../core/services/toast.service';
import { PermissionService } from '../../permission/permission.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../core/services/notification.service';
import { finalize, forkJoin } from 'rxjs';
import { AdminPage } from '../../../shared/models/page';
import { ToastType } from '../../../shared/models/toast';
import {
	NotificationType,
	NotificationTypeTitle,
} from '../../../shared/models/notification';
import { RoleService } from '../../role/role.service';
import { UserRoleDto } from '../models/user-role';

@Component({
	selector: 'app-user-show',
	templateUrl: './user-show.component.html',
	styleUrls: ['./user-show.component.scss'],
})
export class UserShowComponent implements OnInit {
	navigations: AdminNavItem[] = [];
	id: string;
	isLoading = true;
	user: UserDto = new UserDto();
	userRoles: UserRoleDto[] = [];
	currentUserRoles: UserRoleDto[] = [];
	constructor(
		private userService: UserService,
		private loadingService: LoadingService,
		private toastService: ToastService,
		private roleService: RoleService,
		private activatedRoute: ActivatedRoute,
		private notificationService: NotificationService,
		private route: Router
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
			user: this.userService.getUserById(id),
			userRoles: this.roleService.getUserRoles(),
			currentUserRole:
				this.roleService.getUserRolesByUserId(id),
		})
			.pipe(
				finalize(() => {
					this.loadingService.hide();
					this.isLoading = false;
				})
			)
			.subscribe({
				next: (res) => {
					this.user = res.user.data;
					this.navigations = [
						AdminHeaderNav.find(
							(it) => it.page === AdminPage.User
						)!,
					];
					this.navigations = [
						...this.navigations,
						{
							page: AdminPage.None,
							label:
								this.user.lastName +
								' ' +
								this.user.firstName,
							link: '',
						},
					];
					this.userRoles = res.userRoles.data;
					console.log(this.userRoles);
					this.currentUserRoles = res.currentUserRole.data;
				},
				error: (error) => {
					const message =
						error?.error?.error?.description ??
						'Failed to load post data';
					this.toastService.error(message);
				},
			});
	}
	delete() {
		this.toastService
			.confirm(
				ToastType.CONFIRMATION,
				UserConstants.DELETECONFIRMATION
			)
			.then((it) => {
				if (it) {
					this.userService
						.remove(this.user.id)
						.subscribe(() => {
							this.route.navigate(['admin/users']);
							this.notificationService.add(
								NotificationTypeTitle.titles[
									NotificationType.SUCCESS
								],
								UserConstants.DELETESUCCESS,
								NotificationType.SUCCESS
							);
						});
				}
			});
	}
	isUserHaveAccess(roleId) {
		return this.currentUserRoles.find(
			(it) => it.id == roleId
		);
	}
}
