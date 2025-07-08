import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenSizeService {
  private screenSizeSubject = new BehaviorSubject<string>(this.getScreenSize());
  screenSize$ = this.screenSizeSubject.asObservable();

  constructor() {
    window.addEventListener('resize', () => {
      this.screenSizeSubject.next(this.getScreenSize());
    });
  }

  private getScreenSize(): string {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 992) return 'tablet';
    return 'desktop';
  }
}