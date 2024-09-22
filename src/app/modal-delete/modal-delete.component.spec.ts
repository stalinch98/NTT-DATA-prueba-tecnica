import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalDeleteComponent } from './modal-delete.component';
import { of } from 'rxjs';
import { ProductService } from '../product.service';
import { NotificationService } from '../notification.service';
import { ProductInterface } from '../interfaces/interfaces';

describe('ModalDeleteComponent', () => {
  let component: ModalDeleteComponent;
  let fixture: ComponentFixture<ModalDeleteComponent>;
  let productService: jest.Mocked<ProductService>;
  let notificationService: jest.Mocked<NotificationService>;

  beforeEach(async () => {
    const productServiceSpy = {
      deleteProduct: jest.fn()
    };

    const notificationServiceSpy = {
      sendNotification: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [ModalDeleteComponent],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: NotificationService, useValue: notificationServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalDeleteComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductService) as jest.Mocked<ProductService>;
    notificationService = TestBed.inject(NotificationService) as jest.Mocked<NotificationService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit closeModal when close is called', () => {
    const emitSpy = jest.spyOn(component.closeModal, 'emit');
    component.close();
    expect(emitSpy).toHaveBeenCalled();
  });

  it('should call deleteProduct and sendNotification on confirm', () => {
    const mockProduct: ProductInterface = { id: '123', name: 'Test Product' } as ProductInterface;
    component.productDelete = mockProduct;
    productService.deleteProduct.mockReturnValue(of({ message: 'Product deleted' }));
    const emitSpy = jest.spyOn(component.productDeleted, 'emit');
    const closeSpy = jest.spyOn(component, 'close');

    component.confirm();

    expect(productService.deleteProduct).toHaveBeenCalledWith(mockProduct.id);
    expect(notificationService.sendNotification).toHaveBeenCalledWith('Product deleted', 'success');
    expect(closeSpy).toHaveBeenCalled();
    expect(emitSpy).toHaveBeenCalledWith(mockProduct.id);
  });
});
