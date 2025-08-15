import { GenericListingOption } from '../../../shared/models/listing.option';

export class CategoryListingOption extends GenericListingOption {
	constructor() {
		super();
		this.sortBy = 'CreatedDate';
		this.sortDirection = 'asc';
	}
}
