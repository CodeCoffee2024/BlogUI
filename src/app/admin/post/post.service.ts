import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { mapItemsToGenericListing } from '../../core/generics/listing-result.mapper.ts';
import { GenericService } from '../../core/services/generic.service';
import { StatusDto } from '../../shared/dtos/status.dto';
import {
	ApiResult,
	GenericListingResult,
	NullApiResult,
} from '../../shared/models/api-result.model';
import { PostDto } from './models/post';

@Injectable({
	providedIn: 'root',
})
export class PostService extends GenericService {
	private controller = 'post/';
	constructor(private httpClient: HttpClient) {
		super(httpClient);
	}

	getList(
		listingOption
	): Observable<GenericListingResult<PostDto[]>> {
		const queryParams =
			this.setQueryParameters(listingOption);

		return this.get<any>(
			`${this.controller}GetPosts?${queryParams}`,
			null,
			true
		).pipe(
			map((res) =>
				mapItemsToGenericListing<PostDto[]>(res.data)
			)
		);
	}

	getStatuses(): Observable<ApiResult<StatusDto[]>> {
		return this.get(
			`${this.controller}GetStatuses`,
			null,
			true
		);
	}

	create(payload): Observable<ApiResult<PostDto>> {
		return this.post(
			`${this.controller}`,
			payload,
			this.getAuthorizationHeader()
		);
	}

	update(id, payload): Observable<ApiResult<PostDto>> {
		return this.put(
			`${this.controller}${id}`,
			payload,
			this.getAuthorizationHeader()
		);
	}

	remove(id): Observable<NullApiResult> {
		return this.delete(`${this.controller}${id}`);
	}

	getPostById(id): Observable<ApiResult<PostDto>> {
		return this.get(`${this.controller}${id}`, null, true);
	}

	getPostImage(imgName): Observable<ApiResult<any>> {
		return this.get(`image/${imgName}`, null, true);
	}
}
