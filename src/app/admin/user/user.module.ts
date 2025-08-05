import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListingComponent } from './user-listing/user-listing.component';
import { UserNewComponent } from './user-new/user-new.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { UserShowComponent } from './user-show/user-show.component';
import { SharedModule } from '../../shared/shared.module';
import { UserFormComponent } from './user-form/user-form.component';

@NgModule({
	declarations: [
		UserListingComponent,
		UserNewComponent,
		UserUpdateComponent,
		UserShowComponent,
		UserFormComponent,
	],
	imports: [CommonModule, UserRoutingModule, SharedModule],
})
export class UserModule {}
