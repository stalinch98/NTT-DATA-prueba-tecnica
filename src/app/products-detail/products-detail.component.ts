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
  productsTable: ProductInterface[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe((data) => {
      this.products = data.data ?? [];
      this.productsTable = data.data ?? [];
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
    this.productsTable = this.products;
    this.closeModal();
  }

  onProductUpdated(product: ProductInterface) {
    const index = this.products.findIndex(p => p.id === product.id);
    if (index !== -1) {
      this.products[index] = product;
      this.productsTable = this.products;
    }
  }

  onProductDeleted(productId: string) {
    const newProducts = this.products.filter((item: ProductInterface) => item.id !== productId);
    this.products = newProducts;
    this.productsTable = newProducts;
  }

  handleSearchTipoVacuna(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value.toLowerCase();
    const result = this.products.reduce((acc: ProductInterface[], item: ProductInterface) => {
      if ((item.name ?? '').toLowerCase().includes(value)) {
        acc.push(item);
      }
      return acc;
    }, []);
    this.productsTable = result;
  }

}
