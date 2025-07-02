import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {
  private isOpenSubject = new BehaviorSubject<boolean>(false);
  private isDesktopSubject = new BehaviorSubject<boolean>(false);
  private isTabletSubject = new BehaviorSubject<boolean>(false);
  private isMobileSubject = new BehaviorSubject<boolean>(false);

  isOpen$ = this.isOpenSubject.asObservable();
  isDesktop$ = this.isDesktopSubject.asObservable();
  isTablet$ = this.isTabletSubject.asObservable();
  isMobile$ = this.isMobileSubject.asObservable();

  // Breakpoint values (adjust as needed)
  private maxTabletWidth = 768;
  private desktopWidth = 1024;

  constructor() {
    this.checkScreenSize();
    // Listen to window resize events
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  private checkScreenSize() {
    const width = window.innerWidth;
    const isMobile = width < this.maxTabletWidth;
    const isTablet = width >= this.maxTabletWidth && width < this.desktopWidth;
    const isDesktop = width >= this.desktopWidth;

    this.isMobileSubject.next(isMobile);
    this.isTabletSubject.next(isTablet);
    this.isDesktopSubject.next(isDesktop);

    // Auto-close the sidenav when switching to desktop
    if (isDesktop && this.isOpenSubject.value) {
      this.close();
    }
  }

  toggle() {
    this.isOpenSubject.next(!this.isOpenSubject.value);
  }

  open() {
    this.isOpenSubject.next(true);
  }

  close() {
    this.isOpenSubject.next(false);
  }
}