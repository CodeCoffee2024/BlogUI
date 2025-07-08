import { Injectable } from '@angular/core';
import { GenericService } from '../../core/services/generic.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiResult } from '../../shared/models/api-result.model';
import { CategoryResponse } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends GenericService {
  private controller='category/';
  constructor(private httpClient: HttpClient) {
    super(httpClient);
  }
}
