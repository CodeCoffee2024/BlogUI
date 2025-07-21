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

@Component({
	selector: 'app-admin-sidebar',
	templateUrl: './admin-sidebar.component.html',
	styleUrls: ['./admin-sidebar.component.scss'],
})
export class AdminSidebarComponent implements OnInit {
	@Input() isSidebarOpen = false;
	@Input() isDesktop = false;
	// ModuleList = Modules;
	modules: ModuleGroupDto[];
	isLoading = true;
	@Output() closeSidebar = new EventEmitter<void>();
	constructor(
		private systemService: SystemService,
		private loadingService: LoadingService
	) {}
	// get Modules(): string[] {
	//   return Modules
	//     .filter(module => this.getNavigations(module.name).length > 0) // Only modules with enabled navigations
	//     .map(module => module.name);
	// }

	// getNavigations(module: string): SideBarNavigation[] {
	//   return Navigations
	//       .filter(nav => nav.module === module) // Filter navigations by module
	//       .map(nav => new SideBarNavigation(
	//           nav.name,
	//           nav.description,
	//           this.permissionService.hasPermissions(nav.requiredPermission || []), // Ensure it handles undefined permissions
	//           nav.icon,
	//           nav.name,
	//           nav.route
	//       ))
	//       .filter(nav => nav.enabled); // Return only enabled items
	// }
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
				error: () => {
					// this.toastService.error('Failed to load post.');
				},
			});
	}
	onClose(): void {
		if (!this.isDesktop) {
			this.closeSidebar.emit();
		}
	}
}
