import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { LoginComponent } from '../auth/login/login.component';

const routes: Routes = [
	{
		path: '',
		component: AdminComponent,
		children: [
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
