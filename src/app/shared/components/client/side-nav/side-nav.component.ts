import { Component, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { CategoryResponse } from '../../../../dashboard/models/category';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent {
  isCategoryOpen: boolean = false;
  @Input() categories: CategoryResponse[] = [];
  @Input() isOpen = false;
  @Output() closed = new EventEmitter<void>();
  
  isMobile = false;
  isTablet = false;
  isDesktop = false;
  
  maxTabletWidth = 768; // Adjust as needed
  desktopWidth = 1024; // Adjust as needed
  
  ngOnInit() {
    this.checkScreenSize();
  }
  
  @HostListener('window:resize')
  checkScreenSize() {
    const width = window.innerWidth;
    this.isMobile = width < this.maxTabletWidth;
    this.isTablet = width >= this.maxTabletWidth && width < this.desktopWidth;
    this.isDesktop = width >= this.desktopWidth;
    
    // Auto-close the sidenav when switching to desktop
    if (this.isDesktop && this.isOpen) {
      this.close();
    }
  }
  
  close() {
    this.isOpen = false;
    this.closed.emit();
  }
  
  // Prevent closing when clicking inside the sidenav
  preventClose(event: Event) {
    event.stopPropagation();
  }
}
