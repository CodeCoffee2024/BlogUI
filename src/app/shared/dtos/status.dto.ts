export class StatusDto {
	name: string;
	description: string;
}

export function StatusBadge(status: string): string {
	switch (status) {
		case 'activ':
			return '<span class="badge text-bg-success">Active</span>';
		case 'inact':
			return '<span class="badge text-bg-secondary">Inactive</span>';
		default:
			return '<span class="badge text-bg-secondary">Null</span>';
	}
}
