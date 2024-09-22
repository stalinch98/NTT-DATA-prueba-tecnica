import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsDetailComponent } from './products-detail.component';
import { of } from 'rxjs';
import { ProductService } from '../product.service';
import { ProductInterface } from '../interfaces/interfaces';

describe('ProductsDetailComponent', () => {
  let component: ProductsDetailComponent;
  let fixture: ComponentFixture<ProductsDetailComponent>;

  const mockProducts: ProductInterface[] = [{
    id: '1', name: 'Product 1', description: 'Description',
    logo: 'logo-url',
    date_release: new Date(),
    date_revision: new Date()
  }];

  const productServiceMock = {
    getAllProducts: jest.fn().mockReturnValue(of({ data: mockProducts })),
    createProduct: jest.fn(),
    updateProduct: jest.fn(),
    deleteProduct: jest.fn(),
    verificationProduct: jest.fn(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsDetailComponent],
      providers: [
        { provide: ProductService, useValue: productServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load products on init', () => {
    component.ngOnInit();
    expect(productServiceMock.getAllProducts).toHaveBeenCalled();
    expect(component.products).toEqual(mockProducts);
    expect(component.productsTable).toEqual(mockProducts);
  });

  it('should show modal', () => {
    component.showModalPr();
    expect(component.showModalProduct).toBe(true);
  });

  it('should close modal', () => {
    component.closeModal();
    expect(component.showModalProduct).toBe(false);
  });

  it('should add a product on creation', () => {
    const newProduct: ProductInterface = {
      id: '2', name: 'Product 2', description: 'Description',
      logo: 'logo-url',
      date_release: new Date(),
      date_revision: new Date()
    };
    component.onProductCreated(newProduct);
    expect(component.products).toContain(newProduct);
    expect(component.productsTable).toContain(newProduct);
    expect(component.showModalProduct).toBe(false);
  });

  it('should update a product', () => {
    const existingProduct: ProductInterface = {
      id: '1', name: 'Product 1', description: 'Description',
      logo: 'logo-url',
      date_release: new Date(),
      date_revision: new Date()
    };
    const updatedProduct: ProductInterface = {
      id: '1', name: 'Updated Product 1', description: 'Description',
      logo: 'logo-url',
      date_release: new Date(),
      date_revision: new Date()
    };
    component.products = [existingProduct];
    component.onProductUpdated(updatedProduct);
    expect(component.products[0].name).toBe('Updated Product 1');
    expect(component.productsTable[0].name).toBe('Updated Product 1');
  });

  it('should delete a product', () => {
    const productToDelete: ProductInterface = { id: '1', name: 'Product 1', description: 'Description', logo: 'logo-url', date_release: new Date(), date_revision: new Date() };
    component.products = [productToDelete];
    component.onProductDeleted('1');
    expect(component.products).not.toContain(productToDelete);
    expect(component.productsTable).not.toContain(productToDelete);
  });

  it('should filter products by name', () => {
    const mockProducts: ProductInterface[] = [
      {
        id: '1', name: 'Product 1', description: 'Description',
        logo: 'logo-url',
        date_release: new Date(),
        date_revision: new Date()
      },
      {
        id: '2', name: 'Another Product', description: 'Description',
        logo: 'logo-url',
        date_release: new Date(),
        date_revision: new Date()
      }
    ];
    component.products = mockProducts;
    const event = { target: { value: 'Product' } } as unknown as Event;
    component.handleSearchTipoVacuna(event);
    expect(component.productsTable.length).toBe(2);
    expect(component.productsTable[0].name).toBe('Product 1');
  });

  it('should change page size', () => {
    const event = { target: { value: '10' } } as unknown as Event;
    component.handlePageSizeChange(event);
    expect(component.limitRegisters).toBe(10);
  });
});
