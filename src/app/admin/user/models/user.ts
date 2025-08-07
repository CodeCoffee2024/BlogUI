import {
	AbstractControl,
	FormBuilder,
	ValidationErrors,
	Validators,
} from '@angular/forms';
import { FormModel } from '../../../shared/models/form';
import { AuditDto } from '../../../shared/dtos/audit.dto';

export class UserDto extends AuditDto {
	id: string;
	lastName: string;
	firstName: string;
	middleName: string;
	userName: string;
	password: string;
	email: string;
	status: string;
}
export const UserConstants = {
	DELETECONFIRMATION:
		'Are you sure you want to delete this user?',
	DELETESUCCESS: 'User deleted successfully',
	UPDATESUCCESS: 'User updated successfully',
	CREATESUCCESS: 'User created successfully',
};
export class UserForm extends FormModel {
	private fb: FormBuilder;

	constructor() {
		super();
		this.buildForm();
	}

	override buildForm(): void {
		this.fb = new FormBuilder();
		this.form = this.fb.group(
			{
				lastName: ['', Validators.required],
				firstName: ['', Validators.required],
				middleName: [''],
				userName: ['', Validators.required],
				email: ['', Validators.required],
				password: [
					'',
					[Validators.required, Validators.minLength(6)],
				],
				repeatPassword: ['', [Validators.required]],
			},
			{
				validators: this.mustMatchValidator(
					'password',
					'repeatPassword'
				),
			}
		);
	}

	override fillForm(user: UserDto): void {
		this.fb = new FormBuilder();
		this.form = this.fb.group(
			{
				lastName: [user.lastName, Validators.required],
				firstName: [user.firstName, Validators.required],
				middleName: [user.middleName, Validators.required],
				userName: [user.userName, Validators.required],
				email: [user.email, Validators.required],
			},
			{
				validators: this.mustMatchValidator(
					'password',
					'repeatPassword'
				),
			}
		);
	}

	private mustMatchValidator(
		passwordKey: string,
		confirmPasswordKey: string
	) {
		return (
			formGroup: AbstractControl
		): ValidationErrors | null => {
			const password = formGroup.get(passwordKey);
			const confirmPassword = formGroup.get(
				confirmPasswordKey
			);

			if (!password || !confirmPassword) return null;
			if (
				confirmPassword.errors &&
				!confirmPassword.errors[passwordKey]
			)
				return null;

			if (password.value !== confirmPassword.value) {
				confirmPassword.setErrors({
					mustMatch: passwordKey,
				});
			} else {
				confirmPassword.setErrors(null);
			}

			return null;
		};
	}
}
