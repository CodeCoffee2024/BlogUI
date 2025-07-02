import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, switchMap, filter, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
@Injectable()
  export class AuthInterceptor implements HttpInterceptor {
    private isRefreshing = false;
    private refreshTokenSubject = new BehaviorSubject<string | null>(null);
  
    constructor(private authService: AuthService, private router: Router) {}
  
    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      const accessToken = this.authService.getAccessToken();
      let clonedReq = req;
  
      if (accessToken) {
        clonedReq = this.addToken(req, accessToken);
      }
  
      return next.handle(clonedReq).pipe(
        catchError((error: unknown) => {
          if (error instanceof HttpErrorResponse && error.status === 401) {
            return this.handle401Error(req, next);
          }
          return throwError(() => error);
        })
      );
    }
  
    private addToken(req: HttpRequest<unknown>, token: string): HttpRequest<unknown> {
      return req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
    }

    private handle401Error(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
      if (!this.isRefreshing) {
        this.isRefreshing = true;
        this.refreshTokenSubject.next(null);
        return this.authService.refreshToken().pipe(
          switchMap((tokenResponse) => {
            this.isRefreshing = false;
            if (tokenResponse.isSuccess && tokenResponse.data) {
              this.authService.storeTokens(tokenResponse.data.token, tokenResponse.data.refreshToken)
              this.refreshTokenSubject.next(tokenResponse.data.token);
              return next.handle(this.addToken(req, tokenResponse.data.token));
            }
            return throwError(() => new Error('Refresh token failed'));
          }),
          catchError((error) => {
            this.isRefreshing = false;
            this.authService.logout();
            this.router.navigate(['/']);
            return throwError(() => error);
          })
        );
      } else {
        return this.refreshTokenSubject.pipe(
          filter(token => token !== null),
          take(1),
          switchMap(token => next.handle(this.addToken(req, token!)))
        );
      }
    }
  }