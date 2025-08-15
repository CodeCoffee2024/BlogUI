import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryListingComponent } from './category-listing/category-listing.component';
import { CategoryNewComponent } from './category-new/category-new.component';
import { CategoryShowComponent } from './category-show/category-show.component';

const routes: Routes = [
	{ path: '', component: CategoryListingComponent },
	{ path: 'new', component: CategoryNewComponent },
	{ path: ':id', component: CategoryShowComponent },
];
@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class CategoryRoutingModule {}
