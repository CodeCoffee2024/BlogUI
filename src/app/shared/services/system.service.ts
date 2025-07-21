import { Injectable } from '@angular/core';
import { GenericService } from '../../core/services/generic.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ModuleGroupDto } from '../dtos/module-group.dto';
import { ApiResult } from '../models/api-result.model';

@Injectable({
	providedIn: 'root',
})
export class SystemService extends GenericService {
	private controller = 'system';
	constructor(private httpClient: HttpClient) {
		super(httpClient);
	}
	getModuleGroups(): Observable<
		ApiResult<ModuleGroupDto[]>
	> {
		return this.get(
			`${this.controller}/GetModuleGroups/`,
			null,
			false
		);
	}
}
