import { FormBuilder, Validators } from '@angular/forms';
import { environment } from '../../../../../environment';
import { AuditDto } from '../../../shared/dtos/audit.dto';
import { FormModel } from '../../../shared/models/form';
import { CategoryFragment } from '../../category/models/category';

export class TagFragment {
	id: string;
	name: string;
}
export class PostDto extends AuditDto {
	id: string;
	title: string;
	description: string;
	category: CategoryFragment;
	imgPath: string;
	status: string;
	tags: TagFragment[];
}

export class PostModel extends AuditDto {
	id: string;
	title: string;
	category: CategoryFragment;
	description: string;
	categoryId: string;
	img: string;
	tags: string[];
}

export const PostConstants = {
	DELETECONFIRMATION:
		'Are you sure you want to delete this post?',
	DELETESUCCESS: 'Post deleted successfully',
	UPDATESUCCESS: 'Post updated successfully',
	CREATESUCCESS: 'Post created successfully',
};
export class PostForm extends FormModel {
	private fb: FormBuilder;
	imgName = '';
	constructor() {
		super();
		this.buildForm();
	}

	override buildForm(): void {
		this.fb = new FormBuilder();
		this.form = this.fb.group({
			title: ['', Validators.required],
			description: ['', Validators.required],
			Img: ['', Validators.required],
			categoryId: ['', Validators.required],
			tags: [[]],
		});
	}

	override fillForm(post: PostModel): void {
		this.fb = new FormBuilder();
		this.form = this.fb.group({
			title: [post.title, Validators.required],
			description: [post.description, Validators.required],
			Img: [
				environment.folderPath + post.img,
				Validators.required,
			],
			categoryId: [post.categoryId, Validators.required],
			tags: [post.tags, Validators.required],
			category: [post.category],
		});
		this.imgName = post.img;
	}
	get toSubmit(): FormData {
		const formData = new FormData();

		formData.append('title', this.form.get('title').value);
		formData.append(
			'tags',
			JSON.stringify(this.form.get('tags').value)
		);
		formData.append(
			'description',
			this.form.get('description').value
		);

		const categoryValue = this.form.get('categoryId').value;
		const categoryId = categoryValue?.id || categoryValue;
		formData.append('categoryId', categoryId);

		const imageControl = this.form.get('Img');
		console.log(imageControl);
		if (imageControl?.value) {
			const imageFile = imageControl.value;

			if (imageFile instanceof File) {
				formData.append('Img', imageFile, imageFile.name);
			} else if (typeof imageFile === 'string') {
				if (this.isBase64Image(imageFile)) {
					const extension =
						this.getImageExtension(imageFile);
					const blob = this.base64ToBlob(imageFile);
					formData.append(
						'Img',
						blob,
						`image.${extension}`
					);
				} else {
					// Existing image path
					formData.append('imgPath', imageFile);
				}
			}
		}
		return formData;
	}

	private isBase64Image(str: string): boolean {
		return str.startsWith('data:image/');
	}

	private getImageExtension(base64String: string): string {
		if (base64String.includes('svg')) {
			return 'svg';
		}
		if (
			base64String.includes('jpeg') ||
			base64String.includes('jpg')
		) {
			return 'jpg';
		}
		return 'png'; // default fallback
	}

	private base64ToBlob(base64String: string): Blob {
		try {
			const splitIndex = base64String.indexOf(',');
			const metadata = base64String.substring(
				0,
				splitIndex
			);
			const data = base64String.substring(splitIndex + 1);

			let mimeType = 'image/png';
			const mimeMatch = metadata.match(
				/^data:(image\/\w+);/
			);
			if (mimeMatch && mimeMatch[1]) {
				mimeType = mimeMatch[1];
				if (mimeType.includes('svg')) {
					mimeType = 'image/svg+xml';
				}
			}

			if (mimeType === 'image/svg+xml') {
				const decoded = atob(data);
				return new Blob([decoded], { type: mimeType });
			}

			const byteString = atob(data);
			const arrayBuffer = new ArrayBuffer(
				byteString.length
			);
			const uintArray = new Uint8Array(arrayBuffer);

			for (let i = 0; i < byteString.length; i++) {
				uintArray[i] = byteString.charCodeAt(i);
			}

			return new Blob([arrayBuffer], { type: mimeType });
		} catch (error) {
			console.error(
				'Error converting base64 to Blob:',
				error
			);
			return new Blob([], { type: 'image/png' });
		}
	}
}
