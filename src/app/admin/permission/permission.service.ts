import { Injectable } from '@angular/core';
import { GenericService } from '../../core/services/generic.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
	ApiResult,
	GenericListingResult,
} from '../../shared/models/api-result.model';
import {
	PermissionData,
	PermissionDto,
} from '../permission/models/permission';
import { StatusDto } from '../../shared/dtos/status.dto';
import { environment } from '../../../../environment';

@Injectable({
	providedIn: 'root',
})
export class PermissionService extends GenericService {
	private controller = 'permission/';
	constructor(private httpClient: HttpClient) {
		super(httpClient);
	}

	getAllPermissions(): Observable<
		ApiResult<PermissionData[]>
	> {
		localStorage.setItem('token', environment.dummyToken);
		return this.get(`${this.controller}GetAll`, null, true);
	}
}
