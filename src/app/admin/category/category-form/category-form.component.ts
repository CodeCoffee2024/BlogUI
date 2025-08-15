import {
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';
import {
	CategoryConstants,
	CategoryForm,
} from '../models/category';
import { CategoryService } from '../category.service';
import { LoadingService } from '../../../core/services/loading.service';
import { ToastService } from '../../../core/services/toast.service';
import { FormErrorService } from '../../../core/services/form-error.service';
import { finalize, forkJoin } from 'rxjs';

@Component({
	selector: 'app-category-form',
	templateUrl: './category-form.component.html',
	styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent {
	@Input() form: CategoryForm;
	@Input() id: string;
	@Input() isNew: boolean = true;
	@Output() resultId: EventEmitter<string> =
		new EventEmitter<string>();

	constructor(
		private categoryService: CategoryService,
		private loadingService: LoadingService,
		private toastService: ToastService,
		private formErrorService: FormErrorService
	) {}

	onSubmit() {
		this.loadingService.show();
		forkJoin({
			category: this.isNew
				? this.categoryService.create(this.form.form.value)
				: this.categoryService.update(
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
					this.resultId.emit(res.category.data.id);
					this.toastService.success(
						this.isNew
							? CategoryConstants.CREATESUCCESS
							: CategoryConstants.UPDATESUCCESS
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
