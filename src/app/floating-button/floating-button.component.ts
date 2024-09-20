import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-floating-button',
  standalone: true,
  imports: [],
  templateUrl: './floating-button.component.html',
  styleUrl: './floating-button.component.scss'
})
export class FloatingButtonComponent {
  menuVisible: boolean = false;

  toggleMenu(event: MouseEvent) {
    event.stopPropagation();
    this.menuVisible = !this.menuVisible;
  }

  edit() {
    // Lógica para editar
    console.log('Editar');
    this.menuVisible = false;
  }

  delete() {
    // Lógica para eliminar
    console.log('Eliminar');
    this.menuVisible = false;
  }

  @HostListener('document:click', ['$event'])
  handleClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const button = document.querySelector('.floating-button');

    // Verifica si el clic fue fuera del botón o del menú
    if (button && !button.contains(target)) {
      this.menuVisible = false;
    }
  }
}
