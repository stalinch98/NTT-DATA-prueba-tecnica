import { Component, OnInit } from '@angular/core';
import { FloatingButtonComponent } from "../floating-button/floating-button.component";
import { RegisterFormComponent } from "../register-form/register-form.component";
import { ProductService } from '../product.service';
import { ProductInterface } from '../interfaces/interfaces';

@Component({
  selector: 'app-products-detail',
  standalone: true,
  imports: [FloatingButtonComponent, RegisterFormComponent],
  templateUrl: './products-detail.component.html',
  styleUrl: './products-detail.component.scss'
})
export class ProductsDetailComponent implements OnInit {

  showModalProduct: boolean = false;
  products: ProductInterface[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data.data ?? [];
    });

    /* this.products = [
      {
        id: '1',
        logo: 'Logo 1',
        name: 'Producto A',
        description: 'Descripción del producto A',
        date_release: new Date('2024-09-19'),
        date_revision: new Date('2024-09-19')
      },
      {
        id: '2',
        logo: 'Logo 1',
        name: 'Producto B',
        description: 'Descripción del producto B',
        date_release: new Date('2024-09-19'),
        date_revision: new Date('2024-09-19')
      },
      {
        id: '3',
        logo: 'Logo 1',
        name: 'Producto C',
        description: 'Descripción del producto C',
        date_release: new Date('2024-09-19'),
        date_revision: new Date('2024-09-19')
      }
    ]; */
  }

  showModalPr() {
    this.showModalProduct = true;
  }

  closeModal() {
    this.showModalProduct = false;
  }
}
