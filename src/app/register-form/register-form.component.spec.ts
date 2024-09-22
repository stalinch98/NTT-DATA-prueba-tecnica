import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegisterFormComponent } from './register-form.component';
import { FormBuilder } from '@angular/forms';
import { ProductService } from '../product.service';
import { NotificationService } from '../notification.service';
import { of, throwError } from 'rxjs';

describe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;

  const productServiceMock = {
    createProduct: jest.fn(),
    updateProduct: jest.fn(),
    verificationProduct: jest.fn().mockReturnValue(of(true))
  };

  const notificationServiceMock = {
    sendNotification: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterFormComponent],
      providers: [
        FormBuilder,
        { provide: ProductService, useValue: productServiceMock },
        { provide: NotificationService, useValue: notificationServiceMock }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.registerForm.value).toEqual(component.initialFormValues);
  });

  it('should patch form values when isEdit is true', () => {
    component.isEdit = true;
    component.editProduct = {
      id: '123',
      name: 'Test Product',
      description: 'Test Description',
      logo: 'test-logo.png',
      date_release: new Date('2023-01-01'),
      date_revision: new Date('2023-01-02')
    };
    component.ngOnInit();
    expect(component.registerForm.value.name).toBe('Test Product');
  });

  it('should emit closeModal event on close', () => {
    jest.spyOn(component.closeModal, 'emit');
    component.close();
    expect(component.closeModal.emit).toHaveBeenCalled();
  });

  it('should create product on submit when isEdit is false', () => {
    component.isEdit = false;
    jest.spyOn(component.productCreated, 'emit');
    productServiceMock.createProduct.mockReturnValue(of({ message: 'Product created', data: {} }));
    component.onSubmit();
    expect(productServiceMock.createProduct).toHaveBeenCalled();
    expect(notificationServiceMock.sendNotification).toHaveBeenCalledWith('Product created', 'success');
    expect(component.productCreated.emit).toHaveBeenCalled();
  });

  it('should update product on submit when isEdit is true', () => {
    component.isEdit = true;
    jest.spyOn(component.productUpdated, 'emit');
    productServiceMock.updateProduct.mockReturnValue(of({ message: 'Product updated', data: {} }));
    component.onSubmit();
    expect(productServiceMock.updateProduct).toHaveBeenCalled();
    expect(notificationServiceMock.sendNotification).toHaveBeenCalledWith('Product updated', 'success');
    expect(component.productUpdated.emit).toHaveBeenCalled();
  });

  it('should handle error on create product', () => {
    component.isEdit = false;
    productServiceMock.createProduct.mockReturnValue(throwError({ error: { errors: [{ constraints: { error: 'Error message' } }] } }));
    component.onSubmit();
    expect(notificationServiceMock.sendNotification).toHaveBeenCalledWith('Error message', 'error');
  });

  it('should handle error on update product', () => {
    component.isEdit = true;
    productServiceMock.updateProduct.mockReturnValue(throwError({ error: { message: 'Update error' } }));
    component.onSubmit();
    expect(notificationServiceMock.sendNotification).toHaveBeenCalledWith('Update error', 'error');
  });

  it('should reset form to initial values', () => {
    component.registerForm.patchValue({ name: 'Changed' });
    component.resetForm();
    expect(component.registerForm.value).toEqual(component.initialFormValues);
  });
});
