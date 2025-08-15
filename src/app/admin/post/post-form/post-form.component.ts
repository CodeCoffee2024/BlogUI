import {
	Component,
	EventEmitter,
	Input,
	Output,
} from '@angular/core';
import { finalize, forkJoin } from 'rxjs';
import { FormErrorService } from '../../../core/services/form-error.service';
import { LoadingService } from '../../../core/services/loading.service';
import { ToastService } from '../../../core/services/toast.service';
import { InputTypes } from '../../../shared/constants/input-type';
import { GenericDropdownListingOption } from '../../../shared/models/listing.option';
import { CategoryService } from '../../category/category.service';
import { CategoryFragment } from '../../category/models/category';
import { PostConstants, PostForm } from '../models/post';
import { PostService } from '../post.service';

@Component({
	selector: 'app-post-form',
	templateUrl: './post-form.component.html',
	styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent {
	@Input() form: PostForm;
	InputTypes = InputTypes;
	categories: CategoryFragment[];
	@Input() id: string;
	@Input() isNew: boolean = true;
	selectedCategory: CategoryFragment | null = null;
	dropdownListingOption: GenericDropdownListingOption =
		new GenericDropdownListingOption();
	@Output() resultId: EventEmitter<string> =
		new EventEmitter<string>();
	filteredCategories: CategoryFragment[] = [];
	showDropdown = false;
	hasMore = false;
	isDropdownLoading = false;
	imgUpdate = false;
	constructor(
		private postService: PostService,
		private categoryService: CategoryService,
		private loadingService: LoadingService,
		private toastService: ToastService,
		private formErrorService: FormErrorService
	) {}

	onSubmit() {
		this.loadingService.show();
		if (!this.imgUpdate && !this.isNew) {
			this.postService
				.getPostImage(this.form.imgName)
				.subscribe((result) => {
					this.form.form
						.get('Img')
						?.setValue(
							`data:${result.data.contentType};base64,${result.data.fileStream}`
						);
					this.submit();
				});
		} else {
			this.submit();
		}
	}
	submit() {
		forkJoin({
			post: this.isNew
				? this.postService.create(this.form.toSubmit)
				: this.postService.update(
						this.id,
						this.form.toSubmit
				  ),
		})
			.pipe(
				finalize(() => {
					this.loadingService.hide();
				})
			)
			.subscribe({
				next: (res) => {
					this.resultId.emit(res.post.data.id);
					this.toastService.success(
						this.isNew
							? PostConstants.CREATESUCCESS
							: PostConstants.UPDATESUCCESS
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
	async onSearchChanged({
		search,
		page,
		clear = false,
	}: {
		search: string;
		page: number;
		clear: boolean;
	}) {
		this.isDropdownLoading = true;
		this.dropdownListingOption.search = search;
		this.dropdownListingOption.pageNumber = page;

		if (clear) {
			this.categories = [];
		}
		this.categoryService
			.dropdown(this.dropdownListingOption)
			.subscribe((it) => {
				this.hasMore =
					page * it.totalCount <
					it.totalPages * it.totalCount;
				const list = clear
					? it.data
					: [...this.categories, ...it.data];
				this.categories = list;
				this.isDropdownLoading = false;
			});
	}

	onSelectionChange(selected): void {
		this.form.form
			.get('categoryId')
			.setValue(selected.item);
		// this.refresh();
	}

	onImageUploaded(image) {
		this.imgUpdate = true;
		this.form.form.get('Img').setValue(image);
	}
}
