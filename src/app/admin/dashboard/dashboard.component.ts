import { formatDate } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, forkJoin } from 'rxjs';
import { GenericComponent } from '../../core/generics/generic-component';
import { LoadingService } from '../../core/services/loading.service';
import { TitleService } from '../../core/services/title.service';
import { ToastService } from '../../core/services/toast.service';
import { InputTypes } from '../../shared/constants/input-type';
import {
	AdminHeaderNav,
	AdminNavItem,
} from '../../shared/models/nav.config';
import { AdminPage } from '../../shared/models/page';
import { DashboardService } from './dashboard.service';
import {
	ChartDto,
	DashboardDto,
	DashboardModel,
} from './models/dashboard';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends GenericComponent<null> {
	dashboardHeader: DashboardDto[] = [];
	usersPerMonthForm: DashboardModel = new DashboardModel();
	postsPerMonthForm: DashboardModel = new DashboardModel();
	usersPerMonth: ChartDto;
	InputTypes = InputTypes;
	postsPerMonth: ChartDto;
	navigations: AdminNavItem[] = [];
	constructor(
		private dashboardService: DashboardService,
		private loadingService: LoadingService,
		private route: Router,
		private toastService: ToastService,
		private activatedRoute: ActivatedRoute,
		private titleService: TitleService
	) {
		super();
		this.load();
	}
	load() {
		this.loadingService.show();
		this.isLoading = true;
		const now = new Date();
		const startOfMonth = new Date(
			now.getFullYear(),
			now.getMonth(),
			1
		);
		const endOfMonth = new Date(
			now.getFullYear(),
			now.getMonth() + 1,
			0
		);
		forkJoin({
			header: this.dashboardService.getDashboardSummary(),
			usersPerMonth: this.dashboardService.getUsersPerMonth(
				formatDate(startOfMonth, 'yyyy-MM-dd', 'en'),
				formatDate(endOfMonth, 'yyyy-MM-dd', 'en')
			),
			postsPerMonth: this.dashboardService.getPostsPerMonth(
				formatDate(startOfMonth, 'yyyy-MM-dd', 'en'),
				formatDate(endOfMonth, 'yyyy-MM-dd', 'en')
			),
		})
			.pipe(
				finalize(() => {
					this.loadingService.hide();
					this.isLoading = false;
				})
			)
			.subscribe({
				next: (res) => {
					this.dashboardHeader = res.header.data;
					this.usersPerMonth = res.usersPerMonth.data;
					this.postsPerMonth = res.usersPerMonth.data;
					this.navigations = [
						AdminHeaderNav.find(
							(it) => it.page === AdminPage.Dashboard
						)!,
					];
					this.titleService.setTitle('Dashboard');
				},
				error: (error) => {
					const message =
						error?.error?.error?.description ??
						'Failed to load permission data';
					this.toastService.error(message);
				},
			});
	}
	dashboardHeaderValue(label: string) {
		return this.dashboardHeader.find(
			(it) => it.label == label
		)!.value;
	}
	onSubmit(type = 'user') {
		if (
			this.usersPerMonthForm.form.valid &&
			type == 'user'
		) {
			this.isLoading = true;
			this.loadingService.show();

			const dateFrom =
				this.usersPerMonthForm.form.get('dateFrom').value +
				'-01';
			const dateTo =
				this.usersPerMonthForm.form.get('dateTo').value +
				'-01';

			this.dashboardService
				.getUsersPerMonth(dateFrom, dateTo)
				.subscribe({
					next: (result) => {
						this.usersPerMonth = result.data;
					},
					error: (error) => {
						this.toastService.error(
							'An unexpected error occurred'
						);
						console.error(
							'Error loading user stats:',
							error
						);
					},
					complete: () => {
						this.loadingService.hide();
						this.isLoading = false;
					},
				});
		}
		if (
			this.postsPerMonthForm.form.valid &&
			type != 'user'
		) {
			this.isLoading = true;
			this.loadingService.show();

			const dateFrom =
				this.postsPerMonthForm.form.get('dateFrom').value +
				'-01';
			const dateTo =
				this.postsPerMonthForm.form.get('dateTo').value +
				'-01';

			this.dashboardService
				.getPostsPerMonth(dateFrom, dateTo)
				.subscribe({
					next: (result) => {
						this.postsPerMonth = result.data;
					},
					error: (error) => {
						this.toastService.error(
							'An unexpected error occurred'
						);
						console.error(
							'Error loading user stats:',
							error
						);
					},
					complete: () => {
						this.loadingService.hide();
						this.isLoading = false;
					},
				});
		}
	}
}
