import {
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
} from '@angular/core';
import { SystemService } from '../../../services/system.service';
import { finalize } from 'rxjs';
import { LoadingService } from '../../../../core/services/loading.service';
import { ModuleGroupDto } from '../../../dtos/module-group.dto';
import { Router } from '@angular/router';

@Component({
	selector: 'app-admin-sidebar',
	templateUrl: './admin-sidebar.component.html',
	styleUrls: ['./admin-sidebar.component.scss'],
})
export class AdminSidebarComponent implements OnInit {
	@Input() isSidebarOpen = false;
	@Input() isDesktop = false;
	modules: ModuleGroupDto[];
	isLoading = true;
	@Output() closeSidebar = new EventEmitter<void>();
	constructor(
		private systemService: SystemService,
		private loadingService: LoadingService,
		private route: Router
	) {}

	ngOnInit(): void {
		this.systemService
			.getModuleGroups()
			.pipe(
				finalize(() => {
					this.loadingService.hide();
					this.isLoading = false;
				})
			)
			.subscribe({
				next: (res) => {
					this.modules = res.data;
					console.log(res);
				},
				error: () => {},
			});
	}
	onClose(): void {
		if (!this.isDesktop) {
			this.closeSidebar.emit();
		}
	}
	navigate(link) {
		this.route.navigate(['admin' + link]);
	}
}
