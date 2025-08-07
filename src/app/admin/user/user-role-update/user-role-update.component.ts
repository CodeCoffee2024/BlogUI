import { Component, OnInit } from '@angular/core';
import { GenericComponent } from '../../../core/generics/generic-component';
import {
	UserRoleDto,
	UserRoleForm,
} from '../models/user-role';
import {
	AdminHeaderNav,
	AdminNavItem,
} from '../../../shared/models/nav.config';
import { UserService } from '../user.service';
import { LoadingService } from '../../../core/services/loading.service';
import { RoleService } from '../../role/role.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast.service';
import { finalize, forkJoin } from 'rxjs';
import { AdminPage } from '../../../shared/models/page';
import { UserDto } from '../models/user';

@Component({
	selector: 'app-user-role-update',
	templateUrl: './user-role-update.component.html',
	styleUrls: ['./user-role-update.component.scss'],
})
export class UserRoleUpdateComponent
	extends GenericComponent<null>
	implements OnInit
{
	id: string;
	userRoles: UserRoleDto[] = [];
	user: UserDto = new UserDto();
	form: UserRoleForm = new UserRoleForm();
	navigations: AdminNavItem[] = [];
	constructor(
		private roleService: RoleService,
		private userService: UserService,
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
			userRole: this.roleService.getUserRoles(),
			currentUserRole:
				this.roleService.getUserRolesByUserId(id),
			user: this.userService.getUserById(id),
		})
			.pipe(
				finalize(() => {
					this.loadingService.hide();
					this.isLoading = false;
				})
			)
			.subscribe({
				next: (res) => {
					this.userRoles = res.userRole.data;
					this.user = res.user.data;
					this.navigations = [
						AdminHeaderNav.find(
							(it) => it.page === AdminPage.User
						)!,
						{
							page: AdminPage.None,
							label:
								this.user.lastName +
								' ' +
								this.user.firstName,
							link: '/users/' + this.user.id,
						},
						{
							page: AdminPage.None,
							label: 'Roles',
							link: '',
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
					this.form.build(
						this.userRoles,
						res.currentUserRole.data
					);
				},
				error: (error) => {
					const message =
						error?.error?.error?.description ??
						'Failed to load user data';
					this.toastService.error(message);
				},
			});
	}
	onSubmit(id) {
		this.route.navigate(['admin/users/' + id]);
	}
}
