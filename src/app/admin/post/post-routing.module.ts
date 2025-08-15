import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostListingComponent } from './post-listing/post-listing.component';
import { PostNewComponent } from './post-new/post-new.component';
import { PostShowComponent } from './post-show/post-show.component';
import { PostUpdateComponent } from './post-update/post-update.component';

const routes: Routes = [
	{ path: '', component: PostListingComponent },
	{ path: 'new', component: PostNewComponent },
	{ path: ':id', component: PostShowComponent },
	{ path: ':id/update', component: PostUpdateComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PostRoutingModule {}
