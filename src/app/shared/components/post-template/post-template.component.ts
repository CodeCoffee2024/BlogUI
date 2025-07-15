import { Component, Input } from '@angular/core';
import { PostResponse } from '../../../dashboard/models/post';
import { getImage } from '../../utils/file.util';
import { environment } from '../../../../../environment';

@Component({
  selector: 'app-post-template',
  templateUrl: './post-template.component.html',
  styleUrls: ['./post-template.component.scss']
})
export class PostTemplateComponent {
  @Input() post: PostResponse;
  @Input() isMobile = false;

  getImage(file) {
    return getImage(file);
  }

  getLink(id) {
    return environment.uiUrl+"post/"+id;
  }
}
