import {
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';
import {
	UserRoleDto,
	UserRoleForm,
} from '../models/user-role';
import { RoleService } from '../../role/role.service';
import { LoadingService } from '../../../core/services/loading.service';
import { ToastService } from '../../../core/services/toast.service';
import { FormErrorService } from '../../../core/services/form-error.service';
import { finalize, forkJoin } from 'rxjs';
import { RoleConstants } from '../../role/models/role';

@Component({
	selector: 'app-user-role-form',
	templateUrl: './user-role-form.component.html',
	styleUrls: ['./user-role-form.component.scss'],
})
export class UserRoleFormComponent {
	@Input() form: UserRoleForm;
	@Input() roles: UserRoleDto[] = [];
	@Input() userId: string;
	@Output() resultId: EventEmitter<string> =
		new EventEmitter<string>();

	constructor(
		private roleService: RoleService,
		private loadingService: LoadingService,
		private toastService: ToastService,
		private formErrorService: FormErrorService
	) {}

	onSubmit() {
		this.loadingService.show();
		forkJoin({
			role: this.roleService.updateUserRole(
				this.userId,
				this.form.checkedRoles
			),
		})
			.pipe(
				finalize(() => {
					this.loadingService.hide();
				})
			)
			.subscribe({
				next: (res) => {
					this.resultId.emit(this.userId);

					this.toastService.success(
						RoleConstants.UPDATESUCCESS
					);
				},
				error: (error) => {
					const errors = error?.error?.errors;
					this.formErrorService.setServerErrors(
						this.form.form,
						errors
					);
					const message =
						error?.error?.error?.description ??
						'Failed to save form';
					this.toastService.error(message);
				},
			});
	}
}
