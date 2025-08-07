import {
	FormArray,
	FormBuilder,
	Validators,
} from '@angular/forms';
import { FormModel } from '../../../shared/models/form';
import {
	PermissionData,
	PermissionDto,
} from '../../permission/models/permission';
import { UserFragment } from '../../../dashboard/models/user';
import {
	ModuleDto,
	ModuleFragment,
} from '../../../shared/dtos/module.dto';

export class RoleDto extends UserFragment {
	name: string;
	status: string;
	permissions: PermissionData[];
}
export const RoleConstants = {
	DELETECONFIRMATION:
		'Are you sure you want to delete this role?',
	DELETESUCCESS: 'Role deleted successfully',
	UPDATESUCCESS: 'Role updated successfully',
	CREATESUCCESS: 'Role created successfully',
};
export class RoleForm extends FormModel {
	private fb: FormBuilder;

	constructor() {
		super();
		this.buildForm();
	}

	override buildForm(): void {
		this.fb = new FormBuilder();
		this.form = this.fb.group({
			name: ['', Validators.required],
			permissions: this.fb.array([], Validators.required),
		});
	}

	override fillForm(role: RoleDto): void {
		this.fb = new FormBuilder();
		this.form = this.fb.group({
			name: [role.name, Validators.required],
			permissions: this.fb.array(
				role.permissions.map((i) => i.id),
				Validators.required
			),
		});
	}

	get permissionsArray(): FormArray {
		return this.form.get('permissions') as FormArray;
	}
}
