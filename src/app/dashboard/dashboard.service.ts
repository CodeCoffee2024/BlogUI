import { Injectable } from '@angular/core';
import { GenericService } from '../core/services/generic.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResult } from '../shared/models/api-result.model';
import { CategoryResponse } from './models/category';
import { PostDashboardResponse } from './models/post';

@Injectable({
  providedIn: 'root'
})
export class DashboardService extends GenericService {
  private controller='dashboard/';
  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }
  getCategories(): Observable<ApiResult<CategoryResponse[]>> {
    return this.get(`${this.controller}categories?`, null, false);
  }
  getPosts(): Observable<ApiResult<PostDashboardResponse>> {
    return this.get(`${this.controller}posts?`, null, false);
  }
}
