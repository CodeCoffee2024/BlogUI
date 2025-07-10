import { Injectable } from '@angular/core';
import { GenericService } from '../core/services/generic.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericListingResult } from '../shared/models/api-result.model';
import { PostDashboardResponse, PostResponse } from '../dashboard/models/post';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends GenericService {
  private controller='category/';
  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }
  getPostByCategory(name): Observable<GenericListingResult<PostResponse[]>> {
    return this.get(`dashboard/GetPostsByCategory/${name}`, null, false);
  }
}
