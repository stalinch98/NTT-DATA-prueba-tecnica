import { Component } from '@angular/core';
import { FloatingButtonComponent } from "../floating-button/floating-button.component";
import { RegisterFormComponent } from "../register-form/register-form.component";

@Component({
  selector: 'app-products-detail',
  standalone: true,
  imports: [FloatingButtonComponent, RegisterFormComponent],
  templateUrl: './products-detail.component.html',
  styleUrl: './products-detail.component.scss'
})
export class ProductsDetailComponent {

  showModalProduct: boolean = true;

  products: any[] = [
    {
      logo: 'Logo 1',
      name: 'Producto A',
      description: 'Descripción del producto A',
      releaseDate: '2024-09-19',
      revisionDate: '2024-09-19'
    },
    {
      logo: 'Logo 1',
      name: 'Producto B',
      description: 'Descripción del producto B',
      releaseDate: '2024-09-19',
      revisionDate: '2024-09-19'
    },
    {
      logo: 'Logo 1',
      name: 'Producto C',
      description: 'Descripción del producto C',
      releaseDate: '2024-09-19',
      revisionDate: '2024-09-19'
    }
  ];

  showModalPr() {
    debugger;
    this.showModalProduct = true;
  }

  closeModal() {
    this.showModalProduct = false;
  }
}
