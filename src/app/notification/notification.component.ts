import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { NotificationInterface } from '../interfaces/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent implements OnInit {
  message: string = '';
  type: 'success' | 'error' = 'success';
  show: boolean = false;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.getNotification().subscribe((notification: NotificationInterface) => {
      this.message = notification.message;
      this.type = notification.type;
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, 5000);
    });
  }
}
