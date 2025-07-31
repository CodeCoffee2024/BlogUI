import { Component } from '@angular/core';
import {
	AbstractControl,
	FormBuilder,
	FormGroup,
	ValidationErrors,
	Validators,
} from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { AuthRequest } from '../models/auth-request';
import { InputTypes } from '../../shared/constants/input-type';
import { ToastService } from '../../core/services/toast.service';
import { LoadingService } from '../../core/services/loading.service';
import { finalize } from 'rxjs';
import { FormErrorService } from '../../core/services/form-error.service';
import { TitleService } from '../../core/services/title.service';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
	form: FormGroup;
	InputTypes = InputTypes;
	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private router: Router,
		private toastService: ToastService,
		private formErrorService: FormErrorService,
		private loadingservice: LoadingService,
		private titleService: TitleService
	) {
		this.form = this.fb.group(
			{
				username: ['', [Validators.required]],
				email: [
					'',
					[Validators.required, Validators.email],
				],
				password: ['', Validators.required],
				retypePassword: ['', Validators.required],
				firstName: ['', Validators.required],
				middleName: [''],
				lastName: ['', Validators.required],
			},
			{
				validators: this.mustMatchValidator(
					'password',
					'retypePassword'
				),
			}
		);

		this.formErrorService.injectServerErrorControl(
			this.form
		);
		this.titleService.setTitle('Register');
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
	onSubmit(): void {
		const credentials: AuthRequest = this.form.value;
		this.loadingservice.show();
		this.form.markAsDirty();
		this.authService
			.register(credentials)
			.pipe(
				finalize(() => {
					this.loadingservice.hide();
				})
			)
			.subscribe({
				next: (res) => {
					this.formErrorService.clearServerErrorOnChange(
						this.form
					);
					this.toastService.success(
						'Registration successful'
					);
				},
				error: (error) => {
					const message =
						error?.error?.error?.description ??
						'Registration failed';
					this.toastService.error('Error');
					this.formErrorService.setServerErrors(
						this.form,
						error?.error?.errors ?? []
					);
				},
			});
	}
}
