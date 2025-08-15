import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryNewComponent } from './category-new/category-new.component';
import { CategoryShowComponent } from './category-show/category-show.component';
import { CategoryListingComponent } from './category-listing/category-listing.component';
import { SharedModule } from '../../shared/shared.module';
import { CategoryFormComponent } from './category-form/category-form.component';

@NgModule({
	declarations: [
		CategoryNewComponent,
		CategoryShowComponent,
		CategoryListingComponent,
		CategoryFormComponent,
	],
	imports: [
		CommonModule,
		CategoryRoutingModule,
		SharedModule,
	],
})
export class CategoryModule {}
