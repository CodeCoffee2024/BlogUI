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
import {
	CategoryDto,
	CategoryFragment,
} from './models/category';

@Injectable({
	providedIn: 'root',
})
export class CategoryService extends GenericService {
	private controller = 'category/';
	constructor(private httpClient: HttpClient) {
		super(httpClient);
	}
	getList(
		listingOption
	): Observable<GenericListingResult<CategoryDto[]>> {
		const queryParams =
			this.setQueryParameters(listingOption);

		return this.get<any>(
			`${this.controller}GetCategories?${queryParams}`,
			null,
			true
		).pipe(
			map((res) =>
				mapItemsToGenericListing<CategoryDto[]>(res.data)
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
	dropdown(
		dropdownListingOption
	): Observable<GenericListingResult<CategoryFragment[]>> {
		const queryParams = this.setQueryParameters(
			dropdownListingOption
		);
		return this.get<any>(
			`${this.controller}Dropdown?${queryParams}`,
			null,
			true
		).pipe(
			map((res) =>
				mapItemsToGenericListing<CategoryFragment[]>(
					res.data
				)
			)
		);
	}
	create(payload): Observable<ApiResult<CategoryDto>> {
		return this.post(
			`${this.controller}`,
			payload,
			this.getAuthorizationHeader()
		);
	}
	update(id, payload): Observable<ApiResult<CategoryDto>> {
		return this.put(
			`${this.controller}${id}`,
			payload,
			this.getAuthorizationHeader()
		);
	}
	remove(id): Observable<NullApiResult> {
		return this.delete(`${this.controller}${id}`);
	}
	getCategoryById(id): Observable<ApiResult<CategoryDto>> {
		return this.get(`${this.controller}${id}`, null, true);
	}
}
