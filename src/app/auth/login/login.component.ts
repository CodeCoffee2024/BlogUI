import { Component } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
	Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { FormErrorService } from '../../core/services/form-error.service';
import { LoadingService } from '../../core/services/loading.service';
import { TitleService } from '../../core/services/title.service';
import { ToastService } from '../../core/services/toast.service';
import { InputTypes } from '../../shared/constants/input-type';
import { AuthRequest } from '../models/auth-request';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
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
		this.form = this.fb.group({
			usernameEmail: ['', [Validators.required]],
			password: ['', Validators.required],
		});

		this.formErrorService.injectServerErrorControl(
			this.form
		);
		this.formErrorService.clearServerErrorOnChange(
			this.form
		);
		this.titleService.setTitle('Login');
	}

	onSubmit(): void {
		this.formErrorService.clearServerErrorOnChange(
			this.form
		);
		const credentials: AuthRequest = this.form.value;
		this.loadingservice.show();
		this.form.markAsDirty();
		this.authService
			.login(credentials)
			.pipe(
				finalize(() => {
					this.loadingservice.hide();
				})
			)
			.subscribe({
				next: (res) => {
					this.toastService.success('Login successful');
					this.authService.storeTokens(
						res.data.token,
						res.data.refreshToken
					);
					this.router.navigate(['admin/dashboard']);
					this.formErrorService.clearServerErrorOnChange(
						this.form
					);
				},
				error: (error) => {
					const message =
						error?.error?.error?.description ??
						'Login failed';
					this.toastService.error(
						'Error',
						'Something went wrong.'
					);
					this.formErrorService.setServerErrors(this.form, [
						error?.error?.error,
					]);
				},
			});
	}
}
