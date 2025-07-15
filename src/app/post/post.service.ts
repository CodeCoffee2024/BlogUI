import { Injectable } from '@angular/core';
import { GenericService } from '../core/services/generic.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResult } from '../shared/models/api-result.model';
import { PostResponse } from '../dashboard/models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService extends GenericService {
  private controller='post/';
  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }
  getPostById(id): Observable<ApiResult<PostResponse>> {
    return this.get(`dashboard/GetPostById/${id}`, null, false);
  }
}
