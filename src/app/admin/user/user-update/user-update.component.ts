import { Component, OnInit } from '@angular/core';
import { GenericComponent } from '../../../core/generics/generic-component';
import { UserDto, UserForm } from '../models/user';
import {
	AdminHeaderNav,
	AdminNavItem,
} from '../../../shared/models/nav.config';
import { UserService } from '../user.service';
import { LoadingService } from '../../../core/services/loading.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast.service';
import { finalize, forkJoin } from 'rxjs';
import { AdminPage } from '../../../shared/models/page';
import { TitleService } from '../../../core/services/title.service';

@Component({
	selector: 'app-user-update',
	templateUrl: './user-update.component.html',
	styleUrls: ['./user-update.component.scss'],
})
export class UserUpdateComponent
	extends GenericComponent<null>
	implements OnInit
{
	id: string;
	user: UserDto = new UserDto();
	form: UserForm = new UserForm();
	navigations: AdminNavItem[] = [];
	constructor(
		private userService: UserService,
		private loadingService: LoadingService,
		private route: Router,
		private toastService: ToastService,
		private activatedRoute: ActivatedRoute,
		private titleService: TitleService
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
					];
					this.navigations = [
						...this.navigations,
						{
							page: AdminPage.None,
							label: 'Update',
							link: '',
						},
					];
					this.titleService.setTitle(
						'Users - ' +
							this.user.lastName +
							' ' +
							this.user.lastName +
							' Update'
					);
					this.form.fillForm(this.user);
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
