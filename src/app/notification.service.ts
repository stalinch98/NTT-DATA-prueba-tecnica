import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { NotificationInterface } from './interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<NotificationInterface>();

  sendNotification(message: string, type: 'success' | 'error'): void {
    this.notificationSubject.next({ message, type });
  }

  getNotification(): Observable<NotificationInterface> {
    return this.notificationSubject.asObservable();
  }
}
