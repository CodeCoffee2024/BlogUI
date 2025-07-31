import { ModuleDto } from '../../../shared/dtos/module.dto';

export class PermissionDto {
	name: string;
	module: ModuleDto;
}

export class PermissionData {
	id: string;
	name: string;
	module: ModuleDto;
}

interface GroupedPermissions {
	id: string;
	name: string;
	permissions: { name: string; id: string }[];
}
export class PermissionUtil {
	public static groupPermissions(
		permissions: any[]
	): GroupedPermissions[] {
		const map = new Map<string, GroupedPermissions>();

		for (const item of permissions) {
			const moduleId = item.module.id;

			if (!map.has(moduleId)) {
				map.set(moduleId, {
					id: moduleId,
					name: item.module.name,
					permissions: [],
				});
			}

			const group = map.get(moduleId);

			if (
				group &&
				!group.permissions.some((p) => p.name === item.name)
			) {
				group.permissions.push({
					name: item.name,
					id: item.id,
				});
			}
		}

		return Array.from(map.values()).sort((a, b) =>
			a.name.localeCompare(b.name)
		);
	}
}
