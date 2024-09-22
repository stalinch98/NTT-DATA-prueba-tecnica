import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../product.service';
import { ProductInterface } from '../interfaces/interfaces';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent implements OnInit {
  @Output() closeModal = new EventEmitter<void>();
  @Output() productCreated = new EventEmitter<ProductInterface>();
  @Output() productUpdated = new EventEmitter<ProductInterface>();
  @Input() isEdit: boolean = false;
  @Input() editProduct: ProductInterface = {} as ProductInterface;
  bodyProduct: ProductInterface = {} as ProductInterface;

  formData = {
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: '',
    date_revision: '',
  };

  constructor(private _productService: ProductService, private _notificationService: NotificationService) { }

  ngOnInit(): void {
    if (this.isEdit) {
      this.formData = { ...this.editProduct, date_release: this._formatDate(new Date(this.editProduct.date_release)), date_revision: this._formatDate(new Date(this.editProduct.date_revision)) };
    }
  }

  private _formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  close() {
    this.closeModal.emit();
  }

  onSubmit() {
    this.bodyProduct = { ...this.formData, date_release: new Date(this.formData.date_release), date_revision: new Date(this.formData.date_revision) };

    if (this.isEdit) {
      this._productService.updateProduct(this.bodyProduct).subscribe((data) => {
        this._notificationService.sendNotification(data.message, 'success');
        this.productUpdated.emit(data.data);
        this.close();
      }, (er) => {
        this._notificationService.sendNotification(er.error.message, 'error');
      });
    } else {
      this._productService.createProduct(this.bodyProduct).subscribe((data) => {
        this._notificationService.sendNotification(data.message, 'success');
        this.productCreated.emit(data.data);
        this.close();
      }, (er) => {
        this._notificationService.sendNotification(this.getConstraintsString(er.error.errors), 'error');
      });
    }
  }

  getConstraintsString(errors: any[]): string {
    return errors.map(error => Object.values(error.constraints).join(', ')).join(', ');
  }
}
