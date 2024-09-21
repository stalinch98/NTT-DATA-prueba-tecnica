import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductInterface } from '../interfaces/interfaces';

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

  close() {
    this.closeModal.emit();
  }
}
