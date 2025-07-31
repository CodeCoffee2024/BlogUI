import { FormGroup } from '@angular/forms';

export abstract class FormModel {
	form!: FormGroup;

	abstract buildForm(): void;
	abstract fillForm(data): void;
	get isValid() {
		return !this.form.invalid;
	}
	get controls() {
		return this.form.controls;
	}

	getFormControl(controlName) {
		return this.form.get(controlName);
	}

	getControlErrors(controlName): string[] {
		const control = this.form.get(controlName);
		if (!control || !control.errors || !control.dirty)
			return [];

		return Object.keys(control.errors).map((errorKey) => {
			switch (errorKey) {
				case 'required':
					return 'This field is required.';
				case 'email':
					return 'Invalid email address.';
				case 'minlength':
					return `Minimum length is ${control.errors['minlength'].requiredLength}.`;
				case 'maxlength':
					return `Maximum length is ${control.errors['maxlength'].requiredLength}.`;
				case 'pattern':
					return 'Invalid format.';
				default:
					return control?.errors['serverError'];
			}
		});
	}
	setServerErrors(
		errors: { name: string; description: string }[]
	) {
		errors.forEach((err) => {
			const control = this.getFormControl(err.name);
			if (control) {
				control.setErrors({ serverError: err.description });
				control.markAsTouched();
			}
		});
	}
	markAllTouched() {
		Object.values(this.form.controls).forEach((control) => {
			control.markAsTouched();
		});
	}
}
