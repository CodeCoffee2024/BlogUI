import {
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {
	debounceTime,
	distinctUntilChanged,
	Subject,
} from 'rxjs';
import { StatusDto } from '../../../dtos/status.dto';

@Component({
	selector: 'app-listing-header',
	templateUrl: './listing-header.component.html',
	styleUrls: ['./listing-header.component.scss'],
})
export class ListingHeaderComponent implements OnInit {
	search: string = '';
	@Input() selectedStatus: string = '';
	@Input() hasSearch = false;
	@Input() entityName = '';
	@Input() searchPlaceHolder = '';
	@Input() hasStatus = false;
	@Input() hasAddBtn = false;
	@Input() statuses = [];
	@Output() searchResult = new EventEmitter<string>();
	@Output() addBtnClicked = new EventEmitter<void>();
	@Output() statusChangeResult = new EventEmitter<string>();
	searchForm: FormGroup = new FormGroup({
		search: new FormControl(''),
		status: new FormControl(''),
	});
	private searchSubject = new Subject<string>();
	ngOnInit() {
		this.searchForm.get('search')?.setValue(this.search);

		this.searchSubject
			.pipe(debounceTime(300), distinctUntilChanged())
			.subscribe((searchText) => {
				this.searchResult.emit(searchText);
			});

		this.searchForm
			.get('search')
			?.valueChanges.subscribe((value) => {
				this.searchSubject.next(value || '');
			});
	}
	addBtnClick() {
		this.addBtnClicked.emit();
	}
	onStatusChange() {
		this.statusChangeResult.emit(this.selectedStatus);
	}
}
