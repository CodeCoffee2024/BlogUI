import {
	Component,
	EventEmitter,
	forwardRef,
	Input,
	Output,
} from '@angular/core';
import {
	ControlValueAccessor,
	NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
	selector: 'app-tag-input',
	templateUrl: './tag-input.component.html',
	styleUrls: ['./tag-input.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => TagInputComponent),
			multi: true,
		},
	],
})
export class TagInputComponent
	implements ControlValueAccessor
{
	@Input() placeholder = 'Add a tag...';
	@Output() tagsChanged = new EventEmitter<string[]>();

	tags: string[] = [];
	newTag = '';
	disabled = false;

	private onChange: (value: string[]) => void = () => {};
	private onTouched: () => void = () => {};

	addTag(event: Event): void {
		event.preventDefault();
		const tag = this.newTag.trim();

		if (tag && !this.tags.includes(tag)) {
			this.tags.push(tag);
			this.newTag = '';
			this.emitChanges();
		}
	}

	removeTag(tagToRemove: string): void {
		this.tags = this.tags.filter(
			(tag) => tag !== tagToRemove
		);
		this.emitChanges();
	}

	onKeyDown(event: KeyboardEvent): void {
		if (event.key === 'Enter') {
			this.addTag(event);
		} else if (event.key === 'Backspace' && !this.newTag) {
			this.removeTag(this.tags[this.tags.length - 1]);
		}
	}

	private emitChanges(): void {
		this.onChange(this.tags);
		this.onTouched();
		this.tagsChanged.emit(this.tags);
	}

	// ControlValueAccessor methods
	writeValue(value: string[]): void {
		this.tags = value || [];
	}

	registerOnChange(fn: (value: string[]) => void): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.onTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}
}
