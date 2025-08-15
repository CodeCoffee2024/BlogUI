import { AdminPage, Page } from './page';

export interface NavItem {
	page: Page;
	label: string;
	link: string;
}
export interface AdminNavItem {
	page: AdminPage;
	label: string;
	link: string;
}

export const HeaderNav: NavItem[] = [
	{ page: Page.Home, label: 'Home', link: '/' },
	{
		page: Page.Dashboard,
		label: 'Dashboard',
		link: '/dashboard',
	},
	{
		page: Page.Categories,
		label: 'Categories',
		link: '/categories',
	},
	{ page: Page.About, label: 'About', link: '/about' },
	{
		page: Page.Contact,
		label: 'Contact Us',
		link: '/contact-us',
	},
];
export const AdminHeaderNav: AdminNavItem[] = [
	{ page: AdminPage.Role, label: 'Role', link: '/roles' },
	{ page: AdminPage.User, label: 'User', link: '/users' },
	{
		page: AdminPage.Categories,
		label: 'Category',
		link: '/categories',
	},
	{
		page: AdminPage.Post,
		label: 'Post',
		link: '/posts',
	},
];
