import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoleListingComponent } from './role-listing/role-listing.component';
import { RoleNewComponent } from './role-new/role-new.component';
import { RoleShowComponent } from './role-show/role-show.component';
import { RoleUpdateComponent } from './role-update/role-update.component';

const routes: Routes = [
	{ path: '', component: RoleListingComponent },
	{ path: 'new', component: RoleNewComponent },
	{ path: ':id', component: RoleShowComponent },
	{ path: ':id/update', component: RoleUpdateComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class RoleRoutingModule {}
