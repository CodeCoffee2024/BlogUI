import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'nullable',
})
export class NullablePipe implements PipeTransform {
	transform(value: unknown): unknown {
		return value === null ||
			value === undefined ||
			value == ''
			? '--'
			: value;
	}
}
