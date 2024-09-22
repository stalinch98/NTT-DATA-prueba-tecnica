import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductInterface } from '../interfaces/interfaces';
import { ProductService } from '../product.service';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-modal-delete',
  standalone: true,
  imports: [],
  templateUrl: './modal-delete.component.html',
  styleUrl: './modal-delete.component.scss'
})
export class ModalDeleteComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Input() productDelete: ProductInterface = {} as ProductInterface;
  @Output() productDeleted = new EventEmitter<string>();

  constructor(private productService: ProductService, private _notificationService: NotificationService) { }

  close() {
    this.closeModal.emit();
  }

  confirm() {
    this.productService.deleteProduct(this.productDelete.id).subscribe((data) => {
      this._notificationService.sendNotification(data.message, 'success');
      this.close();
      this.productDeleted.emit(this.productDelete.id);
    });

  }
}
