import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../product.service';
import { ProductInterface } from '../interfaces/interfaces';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Input() isEdit: boolean = false;
  bodyProduct: ProductInterface = {} as ProductInterface;

  constructor(private productService: ProductService) { }

  formData = {
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: '',
    date_revision: '',
  };

  close() {
    this.closeModal.emit();
  }

  onSubmit() {
    this.bodyProduct = { ...this.formData, date_release: new Date(this.formData.date_release), date_revision: new Date(this.formData.date_revision) };
    if (!this.isEdit) {
      this.productService.createProduct(this.bodyProduct).subscribe((data) => {
        console.log(data);
      });
    } /* else {
      this.productService.createProduct(this.bodyProduct).subscribe((data) => {
        console.log(data);
      });
    } */
  }
}
