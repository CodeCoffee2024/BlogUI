import { FormBuilder, Validators } from '@angular/forms';
import { UserFragment } from '../../../dashboard/models/user';
import { FormModel } from '../../../shared/models/form';

export class CategoryDto extends UserFragment {
	name: string;
	status: string;
}
export class CategoryFragment {
	name: string;
	id: string;
}
export const CategoryConstants = {
	DELETECONFIRMATION:
		'Are you sure you want to delete this category?',
	DELETESUCCESS: 'Category deleted successfully',
	UPDATESUCCESS: 'Category updated successfully',
	CREATESUCCESS: 'Category created successfully',
};
export class CategoryForm extends FormModel {
	private fb: FormBuilder;

	constructor() {
		super();
		this.buildForm();
	}

	override buildForm(): void {
		this.fb = new FormBuilder();
		this.form = this.fb.group({
			name: ['', Validators.required],
		});
	}

	override fillForm(category: CategoryDto): void {
		this.fb = new FormBuilder();
		this.form = this.fb.group({
			name: [category.name, Validators.required],
		});
	}
}
