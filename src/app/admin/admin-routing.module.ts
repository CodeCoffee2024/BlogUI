import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../auth/login/login.component';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
	{
		path: '',
		component: AdminComponent,
		children: [
			{
				path: 'dashboard',
				component: DashboardComponent,
			},
			{
				path: 'roles',
				loadChildren: () =>
					import('./role/role.module').then(
						(m) => m.RoleModule
					),
			},
			{
				path: 'users',
				loadChildren: () =>
					import('./user/user.module').then(
						(m) => m.UserModule
					),
			},
			{
				path: 'categories',
				loadChildren: () =>
					import('./category/category.module').then(
						(m) => m.CategoryModule
					),
			},
			{
				path: 'posts',
				loadChildren: () =>
					import('./post/post.module').then(
						(m) => m.PostModule
					),
			},
		],
	},
	{
		path: 'login',
		component: LoginComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AdminRoutingModule {}
