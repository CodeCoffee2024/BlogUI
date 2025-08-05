import { Component, OnInit } from '@angular/core';
import { GenericComponent } from '../../../core/generics/generic-component';
import { UserForm } from '../models/user';
import {
	AdminHeaderNav,
	AdminNavItem,
} from '../../../shared/models/nav.config';
import { LoadingService } from '../../../core/services/loading.service';
import { Router } from '@angular/router';
import { ToastService } from '../../../core/services/toast.service';
import { FormErrorService } from '../../../core/services/form-error.service';
import { AdminPage } from '../../../shared/models/page';
import { forkJoin } from 'rxjs';

@Component({
	selector: 'app-user-new',
	templateUrl: './user-new.component.html',
	styleUrls: ['./user-new.component.scss'],
})
export class UserNewComponent
	extends GenericComponent<null>
	implements OnInit
{
	form: UserForm = new UserForm();
	navigations: AdminNavItem[] = [];
	constructor(private route: Router) {
		super();
		this.navigations = [
			AdminHeaderNav.find(
				(it) => it.page === AdminPage.User
			)!,
			{
				page: AdminPage.None,
				label: 'New',
				link: '',
			},
		];
	}
	ngOnInit(): void {}
	onSubmit(id) {
		this.route.navigate(['admin/users/' + id]);
	}
}
