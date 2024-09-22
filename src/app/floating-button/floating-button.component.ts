import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { ModalDeleteComponent } from "../modal-delete/modal-delete.component";
import { RegisterFormComponent } from '../register-form/register-form.component';
import { ProductInterface } from '../interfaces/interfaces';

@Component({
  selector: 'app-floating-button',
  standalone: true,
  imports: [ModalDeleteComponent, RegisterFormComponent],
  templateUrl: './floating-button.component.html',
  styleUrl: './floating-button.component.scss'
})
export class FloatingButtonComponent {
  menuVisible: boolean = false;
  showModalDelete: boolean = false;
  showModalEdit: boolean = false;
  @Input() currentProduct: ProductInterface = {} as ProductInterface;
  @Output() productUpdated = new EventEmitter<ProductInterface>();
  @Output() productDeleted = new EventEmitter<string>();

  toggleMenu(event: MouseEvent) {
    event.stopPropagation();
    this.menuVisible = !this.menuVisible;
  }

  edit() {
    this.menuVisible = false;
    this.showModalEdit = true;
  }

  delete() {
    this.menuVisible = false;
    this.showModalDelete = true;
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const button = document.querySelector('.floating-button');
    if (button && !button.contains(target)) {
      this.menuVisible = false;
    }
  }

  closeModal() {
    this.showModalDelete = false;
  }

  closeModalEdit() {
    this.showModalEdit = false;
  }

  onProductUpdated(product: ProductInterface) {
    this.productUpdated.emit(product);
  }

  onProductDeleted(productId: string) {
    this.productDeleted.emit(productId);
  }
}
