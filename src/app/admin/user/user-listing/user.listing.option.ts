import { GenericListingOption } from '../../../shared/models/listing.option';

export class UserListingOption extends GenericListingOption {
	constructor() {
		super();
		this.sortBy = 'CreatedDate';
		this.sortDirection = 'asc';
	}
}
