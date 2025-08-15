import { Injectable } from '@angular/core';
import { GenericService } from '../../core/services/generic.service';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
	ApiResult,
	GenericListingResult,
	NullApiResult,
} from '../../shared/models/api-result.model';
import { PermissionDto } from '../permission/models/permission';
import { RoleListingOption } from './role-listing/role.listing.option';
import { RoleDto } from './models/role';
import { StatusDto } from '../../shared/dtos/status.dto';
import { environment } from '../../../../environment';
import { UserRoleDto } from '../user/models/user-role';
import { mapItemsToGenericListing } from '../../core/generics/listing-result.mapper.ts';

@Injectable({
	providedIn: 'root',
})
export class RoleService extends GenericService {
	private controller = 'role/';
	constructor(private httpClient: HttpClient) {
		super(httpClient);
	}
	getList(
		listingOption
	): Observable<GenericListingResult<RoleDto[]>> {
		const queryParams =
			this.setQueryParameters(listingOption);

		return this.get<any>(
			`${this.controller}GetRoles?${queryParams}`,
			null,
			true
		).pipe(
			map((res) =>
				mapItemsToGenericListing<RoleDto[]>(res.data)
			)
		);
	}
	getUserRoles(): Observable<ApiResult<UserRoleDto[]>> {
		return this.get(
			`${this.controller}GetUserRoles`,
			null,
			true
		);
	}
	getUserRolesByUserId(
		id
	): Observable<ApiResult<UserRoleDto[]>> {
		return this.get(
			`${this.controller}getUserRolesByUserId/${id}`,
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
	create(payload): Observable<ApiResult<RoleDto>> {
		return this.post(
			`${this.controller}`,
			payload,
			this.getAuthorizationHeader()
		);
	}
	update(id, payload): Observable<ApiResult<RoleDto>> {
		return this.put(
			`${this.controller}${id}`,
			payload,
			this.getAuthorizationHeader()
		);
	}
	updateUserRole(
		userId,
		payload
	): Observable<ApiResult<RoleDto>> {
		return this.put(
			`${this.controller}UpdateUserRole/${userId}`,
			payload,
			this.getAuthorizationHeader()
		);
	}
	remove(id): Observable<NullApiResult> {
		return this.delete(`${this.controller}${id}`);
	}
	getRoleById(id): Observable<ApiResult<RoleDto>> {
		return this.get(`${this.controller}${id}`, null, true);
	}
}
