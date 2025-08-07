import { Injectable } from '@angular/core';
import { GenericService } from '../../core/services/generic.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
	ApiResult,
	GenericListingResult,
	NullApiResult,
} from '../../shared/models/api-result.model';
import { UserDto } from './models/user';
import { environment } from '../../../../environment';
import { StatusDto } from '../../shared/dtos/status.dto';

@Injectable({
	providedIn: 'root',
})
export class UserService extends GenericService {
	private controller = 'user/';
	constructor(private httpClient: HttpClient) {
		super(httpClient);
	}
	getList(
		listingOption
	): Observable<GenericListingResult<UserDto[]>> {
		const queryParams =
			this.setQueryParameters(listingOption);
		return this.get(
			`${this.controller}GetUsers?${queryParams}`,
			null,
			true
		);
	}
	getStatuses(): Observable<ApiResult<StatusDto[]>> {
		return this.get(
			`${this.controller}GetStatuses`,
			null,
			true
		);
	}
	create(payload): Observable<ApiResult<UserDto>> {
		return this.post(
			`${this.controller}`,
			payload,
			this.getAuthorizationHeader()
		);
	}
	update(id, payload): Observable<ApiResult<UserDto>> {
		return this.put(
			`${this.controller}${id}`,
			payload,
			this.getAuthorizationHeader()
		);
	}
	remove(id): Observable<NullApiResult> {
		return this.delete(`${this.controller}${id}`);
	}
	getUserById(id): Observable<ApiResult<UserDto>> {
		return this.get(`${this.controller}${id}`, null, true);
	}
}
