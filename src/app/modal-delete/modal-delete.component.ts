import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-delete',
  standalone: true,
  imports: [],
  templateUrl: './modal-delete.component.html',
  styleUrl: './modal-delete.component.scss'
})
export class ModalDeleteComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Input() productDelete: any;

  close() {
    this.closeModal.emit();
  }
}
