import { Component } from '@angular/core';
import {
	FormBuilder,
	FormGroup,
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
					this.router.navigate(['admin']);
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
