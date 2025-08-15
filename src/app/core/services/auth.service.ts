import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
	BehaviorSubject,
	catchError,
	Observable,
	tap,
	throwError,
} from 'rxjs';
import { GenericService } from './generic.service';
import { AuthRequest } from '../../auth/models/auth-request';
import { ApiResult } from '../../shared/models/api-result.model';
import { AuthResponse } from '../../auth/models/auth-response';

@Injectable({
	providedIn: 'root',
})
export class AuthService extends GenericService {
	private controller = 'auth/';
	private refreshTokenSubject = new BehaviorSubject<
		string | null
	>(null);
	constructor(private httpClient: HttpClient) {
		super(httpClient);
	}
	login(payload): Observable<ApiResult<AuthResponse>> {
		const queryParams = this.setQueryParameters(payload);
		return this.get(
			`${this.controller}login?` + queryParams,
			null,
			false
		);
	}
	register(payload): Observable<ApiResult<AuthResponse>> {
		return this.post(
			`${this.controller}register?`,
			payload
		);
	}
	getAccessToken(): string | null {
		return localStorage.getItem('accessToken');
	}

	getRefreshToken(): string | null {
		return localStorage.getItem('refreshToken');
	}

	refreshToken(): Observable<ApiResult<AuthResponse>> {
		const refreshToken = this.getRefreshToken();
		if (!refreshToken)
			return throwError(
				() => new Error('No refresh token available')
			);

		return this.post<ApiResult<AuthResponse>>(
			`${this.controller}refresh/${refreshToken}`,
			{ refreshToken }
		).pipe(
			tap((result) => {
				if (result.isSuccess && result.data) {
					this.storeTokens(
						result.data.token,
						result.data.refreshToken
					);
					this.refreshTokenSubject.next(result.data.token);
				}
			}),
			catchError((error) => throwError(() => error))
		);
	}

	storeTokens(
		accessToken: string,
		refreshToken: string
	): void {
		localStorage.setItem('accessToken', accessToken);
		localStorage.setItem('refreshToken', refreshToken);
	}
	storeUserInfo(key: string, value: string) {
		localStorage.setItem(key, value);
	}
	logout(): void {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('permission');
		localStorage.removeItem('refreshToken');
	}
	hasAccess(permission: string) {
		const permissions = localStorage
			.getItem('permission')
			.split(',');
		return permissions.includes(permission);
	}
}
