import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoleRoutingModule } from './role-routing.module';
import { RoleListingComponent } from './role-listing/role-listing.component';
import { RoleNewComponent } from './role-new/role-new.component';
import { RoleUpdateComponent } from './role-update/role-update.component';
import { SharedModule } from '../../shared/shared.module';
import { RoleFormComponent } from './role-form/role-form.component';
import { RoleShowComponent } from './role-show/role-show.component';

@NgModule({
	declarations: [
		RoleListingComponent,
		RoleNewComponent,
		RoleUpdateComponent,
  RoleFormComponent,
  RoleShowComponent,
	],
	imports: [CommonModule, RoleRoutingModule, SharedModule],
})
export class RoleModule {}
