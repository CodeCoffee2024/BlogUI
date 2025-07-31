import {
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
} from '@angular/core';
import { RoleForm } from '../models/role';
import {
	PermissionData,
	PermissionUtil,
} from '../../permission/models/permission';
import { FormControl } from '@angular/forms';
import { finalize, forkJoin } from 'rxjs';
import { RoleService } from '../role.service';
import { LoadingService } from '../../../core/services/loading.service';
import { FormErrorService } from '../../../core/services/form-error.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
	selector: 'app-role-form',
	templateUrl: './role-form.component.html',
	styleUrls: ['./role-form.component.scss'],
})
export class RoleFormComponent {
	@Input() form: RoleForm;
	@Input() id: string;
	@Input() isNew: boolean = true;
	@Input() permissions: PermissionData[];
	@Output() resultId: EventEmitter<string> =
		new EventEmitter<string>();

	constructor(
		private roleService: RoleService,
		private loadingService: LoadingService,
		private toastService: ToastService,
		private formErrorService: FormErrorService
	) {}

	get permissionGroup() {
		return PermissionUtil.groupPermissions(
			this.permissions
		);
	}

	isPermissionSelected(permissionId: string): boolean {
		return this.form.permissionsArray.value.includes(
			permissionId
		);
	}

	onTogglePermission(event: Event, permissionId: string) {
		const isChecked = (event.target as HTMLInputElement)
			.checked;
		const permissionsArray = this.form.permissionsArray;

		if (isChecked) {
			permissionsArray.push(new FormControl(permissionId));
		} else {
			const index = permissionsArray.value.findIndex(
				(id: string) => id === permissionId
			);
			if (index >= 0) {
				permissionsArray.removeAt(index);
			}
		}
		console.log(this.form.form.value);
		permissionsArray.markAsTouched();
		permissionsArray.markAsDirty();
	}

	onSubmit() {
		this.loadingService.show();
		forkJoin({
			role: this.isNew
				? this.roleService.create(this.form.form.value)
				: this.roleService.update(
						this.id,
						this.form.form.value
				  ),
		})
			.pipe(
				finalize(() => {
					this.loadingService.hide();
				})
			)
			.subscribe({
				next: (res) => {
					this.resultId.emit(res.role.data.id);
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
