import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListingComponent } from './user-listing/user-listing.component';
import { UserNewComponent } from './user-new/user-new.component';
import { UserShowComponent } from './user-show/user-show.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { UserRoleUpdateComponent } from './user-role-update/user-role-update.component';

const routes: Routes = [
	{ path: '', component: UserListingComponent },
	{ path: 'new', component: UserNewComponent },
	{ path: ':id', component: UserShowComponent },
	{ path: ':id/update', component: UserUpdateComponent },
	{
		path: ':id/update-role',
		component: UserRoleUpdateComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class UserRoutingModule {}
