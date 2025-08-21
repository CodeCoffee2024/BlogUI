import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { mapItemsToGenericListing } from '../core/generics/listing-result.mapper.ts';
import { GenericService } from '../core/services/generic.service';
import { PostResponse } from '../dashboard/models/post';
import { GenericListingResult } from '../shared/models/api-result.model';

@Injectable({
	providedIn: 'root',
})
export class CategoryService extends GenericService {
	private controller = 'category/';
	constructor(private httpClient: HttpClient) {
		super(httpClient);
	}
	getPostByCategory(
		name,
		page = 1
	): Observable<GenericListingResult<PostResponse[]>> {
		return this.get<any>(
			`dashboard/GetPostsByCategory/${name}?pageNumber=${page}`,
			null,
			true
		).pipe(
			map((res) =>
				mapItemsToGenericListing<PostResponse[]>(res.data)
			)
		);
	}
}
