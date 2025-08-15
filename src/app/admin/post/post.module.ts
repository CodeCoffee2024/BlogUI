import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../shared/shared.module';
import { PostFormComponent } from './post-form/post-form.component';
import { PostListingComponent } from './post-listing/post-listing.component';
import { PostNewComponent } from './post-new/post-new.component';
import { PostRoutingModule } from './post-routing.module';
import { PostShowComponent } from './post-show/post-show.component';
import { PostUpdateComponent } from './post-update/post-update.component';
import { TagInputComponent } from './post-form/tag-input/tag-input.component';

@NgModule({
	declarations: [
		PostUpdateComponent,
		PostNewComponent,
		PostFormComponent,
		PostListingComponent,
		PostShowComponent,
  TagInputComponent,
	],
	imports: [CommonModule, PostRoutingModule, SharedModule],
})
export class PostModule {}
