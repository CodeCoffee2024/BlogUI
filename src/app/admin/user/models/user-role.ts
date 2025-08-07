import { FormBuilder } from '@angular/forms';
import { FormModel } from '../../../shared/models/form';

export class UserRoleDto {
	id: string;
	name: string;
}

export class UserRoleForm extends FormModel {
	private fb: FormBuilder;

	constructor() {
		super();
	}
	override buildForm(): void {}
	build(
		roles: UserRoleDto[],
		userRoles: UserRoleDto[]
	): void {
		this.fb = new FormBuilder();
		const roleControls: { [key: string]: any } = {};
		roles.forEach((role) => {
			roleControls[role.id] = [
				userRoles.find((it) => it.id == role.id),
			]; // bind to checkbox
		});
		this.form = this.fb.group(roleControls);
	}
	get checkedRoles() {
		if (!this.form) return [];

		return {
			roles: Object.entries(this.form.value)
				.filter(([_, isChecked]) => isChecked)
				.map(([roleId]) => roleId),
		};
	}
	override fillForm(roles: UserRoleDto[]): void {
		this.fb = new FormBuilder();
		this.form = this.fb.group({});
	}
}
