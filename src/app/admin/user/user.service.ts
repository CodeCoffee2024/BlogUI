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
		localStorage.setItem('token', environment.dummyToken);
		const queryParams =
			this.setQueryParameters(listingOption);
		return this.get(
			`${this.controller}GetUsers?${queryParams}`,
			null,
			true
		);
	}
	getStatuses(): Observable<ApiResult<StatusDto[]>> {
		localStorage.setItem('token', environment.dummyToken);
		return this.get(
			`${this.controller}GetStatuses`,
			null,
			true
		);
	}
	create(payload): Observable<ApiResult<UserDto>> {
		localStorage.setItem('token', environment.dummyToken);
		return this.post(
			`${this.controller}`,
			payload,
			this.getAuthorizationHeader()
		);
	}
	update(id, payload): Observable<ApiResult<UserDto>> {
		localStorage.setItem('token', environment.dummyToken);
		return this.put(
			`${this.controller}${id}`,
			payload,
			this.getAuthorizationHeader()
		);
	}
	remove(id): Observable<NullApiResult> {
		localStorage.setItem('token', environment.dummyToken);
		return this.delete(`${this.controller}${id}`);
	}
	getUserById(id): Observable<ApiResult<UserDto>> {
		localStorage.setItem('token', environment.dummyToken);
		return this.get(`${this.controller}${id}`, null, true);
	}
}
