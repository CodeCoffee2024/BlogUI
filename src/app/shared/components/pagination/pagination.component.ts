import {
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
} from '@angular/core';
import { GenericListingResult } from '../../models/api-result.model';

@Component({
	selector: 'app-pagination',
	templateUrl: './pagination.component.html',
	styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
	@Input() listingData;
	@Output() changePage = new EventEmitter<number>();
	ngOnInit() {}
	onPageChange(page) {
		this.changePage.emit(page);
	}
	get pages(): number[] {
		return Array(this.listingData.totalPages)
			.fill(0)
			.map((_, i) => i + 1);
	}
}
