import { GenericListingOption } from '../../../shared/models/listing.option';

export class RoleListingOption extends GenericListingOption {
	userPermissions: string;
	constructor() {
		super();
		this.sortBy = 'CreatedDate';
		this.sortDirection = 'asc';
	}
}
