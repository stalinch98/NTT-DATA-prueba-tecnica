import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent implements OnInit {
  message: string = '';
  show: boolean = false;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.getNotification().subscribe((message: string) => {
      this.message = message;
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, 5000);
    });
  }
}
