import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new Subject<string>();

  sendNotification(message: string): void {
    this.notificationSubject.next(message);
  }

  getNotification(): Observable<string> {
    return this.notificationSubject.asObservable();
  }
}
