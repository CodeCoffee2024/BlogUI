import { UserFragment } from '../../dashboard/models/user';

export class AuditDto {
	createdBy: UserFragment;
	updatedBy: UserFragment;
	createdOn: Date;
	updatedOn: Date;
}
