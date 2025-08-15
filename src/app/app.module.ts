import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import {
	HTTP_INTERCEPTORS,
	HttpClientModule,
} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthInterceptor } from './core/auth.interceptor';
import { FooterComponent } from './shared/components/client/footer/footer.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
	declarations: [
		AppComponent,
		LoginComponent,
		RegisterComponent,
		FooterComponent,
	],
	imports: [
		BrowserModule,
		CommonModule,
		ReactiveFormsModule,
		RouterModule,
		HttpClientModule,
		AppRoutingModule,
		SharedModule,
	],
	providers: [
		// { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
