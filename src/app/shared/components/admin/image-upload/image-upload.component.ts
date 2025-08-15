import {
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
} from '@angular/core';

@Component({
	selector: 'app-image-upload',
	templateUrl: './image-upload.component.html',
	styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent implements OnInit {
	@Output() imageUploaded = new EventEmitter<string>();
	@Input() image = '';
	previewUrl: string | ArrayBuffer | null = null;
	errorMessage: string | null = null;
	isDragging = false;

	ngOnInit(): void {
		console.log(this.image);
		this.previewUrl = this.image ?? null;
	}
	onFileSelected(event: any): void {
		const file = event.target.files[0];
		this.processFile(file);
	}

	onDragOver(event: DragEvent): void {
		event.preventDefault();
		event.stopPropagation();
		this.isDragging = true;
	}

	onDragLeave(event: DragEvent): void {
		event.preventDefault();
		event.stopPropagation();
		this.isDragging = false;
	}

	onDrop(event: DragEvent): void {
		event.preventDefault();
		event.stopPropagation();
		this.isDragging = false;

		if (event.dataTransfer?.files) {
			const file = event.dataTransfer.files[0];
			this.processFile(file);
		}
	}

	private processFile(file: File): void {
		this.errorMessage = null;

		// Check file size (1MB max)
		if (file.size > 1048576) {
			this.errorMessage = 'File size exceeds 1MB limit';
			return;
		}

		// Check if image
		if (!file.type.match('image.*')) {
			this.errorMessage = 'Only image files are allowed';
			return;
		}

		const reader = new FileReader();
		reader.onload = (e) => {
			const img = new Image();
			img.onload = () => {
				// Check if square
				if (img.width !== img.height) {
					this.errorMessage =
						'Image must be square (equal width and height)';
					this.previewUrl = null;
					return;
				}

				this.previewUrl = e.target?.result as string;
				this.imageUploaded.emit(this.previewUrl as string);
			};
			img.src = e.target?.result as string;
		};
		reader.readAsDataURL(file);
	}

	removeImage(): void {
		this.previewUrl = null;
		this.errorMessage = null;
	}
}
