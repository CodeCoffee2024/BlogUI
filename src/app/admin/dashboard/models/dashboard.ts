import {
	FormBuilder,
	FormGroup,
	Validators,
} from '@angular/forms';

export class DashboardDto {
	label: string;
	value: string;
}
export class ChartDto {
	title: string;
	labels: string[];
	values: any[];
}

export class DashboardModel {
	private fb: FormBuilder;
	form!: FormGroup;
	constructor() {
		this.buildForm();
	}

	buildForm(): void {
		this.fb = new FormBuilder();
		this.form = this.fb.group({
			dateFrom: ['', Validators.required],
			dateTo: ['', Validators.required],
		});
	}
}
