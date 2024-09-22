import { Component, OnInit } from '@angular/core';
import { FloatingButtonComponent } from "../floating-button/floating-button.component";
import { RegisterFormComponent } from "../register-form/register-form.component";
import { ProductService } from '../product.service';
import { ProductInterface } from '../interfaces/interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products-detail',
  standalone: true,
  imports: [FloatingButtonComponent, RegisterFormComponent, CommonModule],
  templateUrl: './products-detail.component.html',
  styleUrl: './products-detail.component.scss'
})
export class ProductsDetailComponent implements OnInit {

  showModalProduct: boolean = false;
  products: ProductInterface[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data.data ?? [];
    });
  }

  showModalPr() {
    this.showModalProduct = true;
  }

  closeModal() {
    this.showModalProduct = false;
  }

  onProductCreated(product: ProductInterface) {
    this.products.push(product);
    this.closeModal();
  }

  onProductUpdated(product: ProductInterface) {
    const index = this.products.findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.products[index] = product;
    }
  }

}
