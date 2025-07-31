import { CategoryResponse } from './category';
import { UserFragment } from './user';

export class PostResponse {
	id: string;
	title: string;
	description: string;
	category: CategoryResponse;
	imgPath: string;
	createdByUser?: null | UserFragment;
	createdOn: Date;
}

export class PostDashboardResponse {
	top4: PostResponse[];
	highlights: PostResponse[];
	top2: PostResponse[];
	latest: PostResponse[];
}
