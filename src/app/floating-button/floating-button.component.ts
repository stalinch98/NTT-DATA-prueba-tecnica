import { Component, HostListener, Input } from '@angular/core';
import { ModalDeleteComponent } from "../modal-delete/modal-delete.component";

@Component({
  selector: 'app-floating-button',
  standalone: true,
  imports: [ModalDeleteComponent],
  templateUrl: './floating-button.component.html',
  styleUrl: './floating-button.component.scss'
})
export class FloatingButtonComponent {
  menuVisible: boolean = false;
  showModalDelete: boolean = false;

  toggleMenu(event: MouseEvent) {
    event.stopPropagation();
    this.menuVisible = !this.menuVisible;
  }

  edit() {
    this.menuVisible = false;
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
}
