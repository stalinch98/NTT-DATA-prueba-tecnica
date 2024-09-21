import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductInterface } from '../interfaces/interfaces';
import { ProductService } from '../product.service';

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

  constructor(private productService: ProductService) { }

  close() {
    this.closeModal.emit();
  }

  confirm() {
    this.productService.deleteProduct(this.productDelete.id).subscribe((data) => {
      console.log(data);
    });
  }
}
