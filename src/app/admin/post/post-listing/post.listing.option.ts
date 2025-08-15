import { GenericListingOption } from '../../../shared/models/listing.option';

export class PostListingOption extends GenericListingOption {
	constructor() {
		super();
		this.sortBy = 'CreatedDate';
		this.sortDirection = 'asc';
	}
}
