import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericService } from '../../core/services/generic.service';
import { GenericListingResult } from '../../shared/models/api-result.model';
import { ChartDto, DashboardDto } from './models/dashboard';

@Injectable({
	providedIn: 'root',
})
export class DashboardService extends GenericService {
	private controller = 'dashboard/';
	constructor(private httpClient: HttpClient) {
		super(httpClient);
	}

	getDashboardSummary(): Observable<
		GenericListingResult<DashboardDto[]>
	> {
		return this.get(
			`${this.controller}GetDashboardAdminSummary`,
			null,
			true
		);
	}
	getUsersPerMonth(
		dateFrom: string,
		dateTo: string
	): Observable<GenericListingResult<ChartDto>> {
		return this.get(
			`${this.controller}GetUsersPerMonth/${dateFrom}/${dateTo}`,
			null,
			true
		);
	}
	getPostsPerMonth(
		dateFrom: string,
		dateTo: string
	): Observable<GenericListingResult<ChartDto>> {
		return this.get(
			`${this.controller}GetPostsPerMonth/${dateFrom}/${dateTo}`,
			null,
			true
		);
	}
}
