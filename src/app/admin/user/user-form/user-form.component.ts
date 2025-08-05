import {
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';
import { UserConstants, UserForm } from '../models/user';
import { UserService } from '../user.service';
import { LoadingService } from '../../../core/services/loading.service';
import { ToastService } from '../../../core/services/toast.service';
import { FormErrorService } from '../../../core/services/form-error.service';
import { finalize, forkJoin } from 'rxjs';

@Component({
	selector: 'app-user-form',
	templateUrl: './user-form.component.html',
	styleUrls: ['./user-form.component.scss'],
})
export class UserFormComponent {
	@Input() form: UserForm;
	@Input() id: string;
	@Input() isNew: boolean = true;
	@Output() resultId: EventEmitter<string> =
		new EventEmitter<string>();

	constructor(
		private userService: UserService,
		private loadingService: LoadingService,
		private toastService: ToastService,
		private formErrorService: FormErrorService
	) {}

	onSubmit() {
		this.loadingService.show();
		forkJoin({
			role: this.isNew
				? this.userService.create(this.form.form.value)
				: this.userService.update(
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

					this.toastService.success(
						this.isNew
							? UserConstants.CREATESUCCESS
							: UserConstants.UPDATESUCCESS
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
