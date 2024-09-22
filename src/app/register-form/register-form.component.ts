import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { ProductInterface } from '../interfaces/interfaces';
import { NotificationService } from '../notification.service';
import { dateReleaseValidator, dateRevisionValidator, isValidIdValidator } from '../validators/custom-validators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent implements OnInit {
  @Input() editProduct: ProductInterface = {} as ProductInterface;
  @Input() isEdit: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() productCreated = new EventEmitter<ProductInterface>();
  @Output() productUpdated = new EventEmitter<ProductInterface>();
  bodyProduct: ProductInterface = {} as ProductInterface;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private _productService: ProductService, private _notificationService: NotificationService) {
    this.registerForm = this.fb.group({
      id: ['', { validators: [Validators.required, Validators.minLength(3), Validators.maxLength(10)], asyncValidators: [isValidIdValidator(_productService, 'id')] }],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', Validators.required],
      date_release: ['', [Validators.required, dateReleaseValidator]],
      date_revision: ['', [Validators.required, dateRevisionValidator('date_release')]]
    });
  }

  ngOnInit(): void {
    if (this.isEdit) {
      this.registerForm.patchValue({
        id: this.editProduct.id,
        name: this.editProduct.name,
        description: this.editProduct.description,
        logo: this.editProduct.logo,
        date_release: this._formatDate(new Date(this.editProduct.date_release)),
        date_revision: this._formatDate(new Date(this.editProduct.date_revision))
      });
      this.registerForm.get('id')?.disable();
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

  onSubmit(value: any) {
    this.bodyProduct = { ...value, date_release: new Date(value.date_release), date_revision: new Date(value.date_revision) };

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
