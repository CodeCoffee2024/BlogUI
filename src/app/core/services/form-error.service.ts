import { Injectable } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { toCamelCase } from '../../shared/utils/string.util';

@Injectable({
	providedIn: 'root',
})
export class FormErrorService {
	injectServerErrorControl(form: FormGroup): void {
		if (!form.contains('serverError')) {
			form.addControl('serverError', new FormControl(''));
		}
	}

	setServerErrors(
		formGroup: FormGroup,
		errors: { name: string; description: string }[]
	): void {
		if (!errors) {
			return;
		}
		this.markFormGroupDirty(formGroup);
		this.clearServerErrorOnChange(formGroup);
		const globalErrors: Record<string, string[]> = {};

		errors.forEach(({ name, description }) => {
			const controlKey = toCamelCase(name);

			if (formGroup.controls[controlKey]) {
				const currentErrors =
					formGroup.controls[controlKey].errors || {};
				const serverErrors =
					currentErrors['serverError'] || [];

				formGroup.controls[controlKey].setErrors({
					serverError: [...serverErrors, description],
				});
			} else {
				if (!globalErrors[name]) {
					globalErrors[name] = [];
				}
				globalErrors[name].push(description);
			}
		});

		if (Object.keys(globalErrors).length > 0) {
			formGroup.setErrors({ serverError: globalErrors });
		}
	}
	markFormGroupDirty(formGroup: FormGroup): void {
		Object.keys(formGroup.controls).forEach((field) => {
			const control = formGroup.get(field);
			control?.markAsDirty({ onlySelf: true });

			if (control instanceof FormGroup) {
				this.markFormGroupDirty(control); // recurse for nested FormGroups
			}
		});
	}
	clearServerErrorOnChange(form: FormGroup): void {
		// Clear form-level server error
		if (form.errors && form.errors['serverError']) {
			const { serverError, ...rest } = form.errors;
			form.setErrors(
				Object.keys(rest).length > 0 ? rest : null
			);
		}

		// Clear control-level server errors
		Object.keys(form.controls).forEach((key) => {
			const control = form.get(key);
			if (
				control &&
				control.errors &&
				control.errors['serverError']
			) {
				const { serverError, ...rest } = control.errors;
				control.setErrors(
					Object.keys(rest).length > 0 ? rest : null
				);
			}

			// Recurse into nested FormGroups
			if (control instanceof FormGroup) {
				this.clearServerErrorOnChange(control);
			}
		});
	}
}
