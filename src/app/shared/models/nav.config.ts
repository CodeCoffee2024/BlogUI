import { Page } from "./page";

export interface NavItem {
    page: Page;
    label: string;
    link: string;
}

export const HeaderNav: NavItem[] = [
    { page: Page.Home, label: 'Home', link: '/' },
    { page: Page.Dashboard, label: 'Dashboard', link: '/dashboard' },
    { page: Page.Categories, label: 'Categories', link: '/categories' },
    { page: Page.About, label: 'About', link: '/about' },
    { page: Page.Contact, label: 'Contact', link: '/contact' },
];