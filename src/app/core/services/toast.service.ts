import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon, SweetAlertPosition } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private show(icon: SweetAlertIcon, title: string, text?: string): void {
    Swal.fire({
      icon,
      title,
      text: text || '',
      showConfirmButton: false,
      timer: 3000,
      position: 'center',
      customClass: {
        popup: 'custom-alert-box'
      },
      background: '#fff',
      width: '300px',
      timerProgressBar: false
    });
  }

  success(message: string, subtitle?: string): void {
    this.show('success', message, subtitle);
  }

  error(message: string, subtitle?: string): void {
    this.show('error', message, subtitle);
  }

  info(message: string, subtitle?: string): void {
    this.show('info', message, subtitle);
  }

  warning(message: string, subtitle?: string): void {
    this.show('warning', message, subtitle);
  }
}