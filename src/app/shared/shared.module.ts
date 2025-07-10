import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './components/client/side-nav/side-nav.component';
import { HeaderComponent } from './components/client/header/header.component';
import { TruncatePipe } from './pipes/truncate.pipe';
import { PostTemplateComponent } from './components/post-template/post-template.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
      SideNavComponent,
      HeaderComponent,
      TruncatePipe,
      PostTemplateComponent
    ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SideNavComponent,
    HeaderComponent,
    TruncatePipe,
    PostTemplateComponent,
    RouterModule
  ]
})
export class SharedModule { }
