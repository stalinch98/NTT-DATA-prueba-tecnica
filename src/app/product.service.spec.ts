import { TestBed } from '@angular/core/testing';
import { ProductService } from './product.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductInterface } from './interfaces/interfaces';
import { environment } from '../environments/environment';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all products (GET)', () => {
    const mockProducts = [{ id: '1', name: 'Product 1' }, { id: '2', name: 'Product 2' }];

    service.getAllProducts().subscribe(products => {
      expect(products).toEqual(mockProducts);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/products`);
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);
  });

  it('should create a new product (POST)', () => {
    const newProduct: ProductInterface = {
      id: '3',
      name: 'New Product',
      description: 'Description',
      logo: 'logo-url',
      date_release: new Date(),
      date_revision: new Date()
    };

    service.createProduct(newProduct).subscribe(response => {
      expect(response).toEqual(newProduct);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/products`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newProduct);
    req.flush(newProduct);
  });

  it('should update an existing product (PUT)', () => {
    const updatedProduct: ProductInterface = {
      id: '1',
      name: 'Updated Product',
      description: 'Updated Description',
      logo: 'updated-logo-url',
      date_release: new Date(),
      date_revision: new Date()
    };

    service.updateProduct(updatedProduct).subscribe(response => {
      expect(response).toEqual(updatedProduct);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/products/${updatedProduct.id}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedProduct);
    req.flush(updatedProduct);
  });

  it('should delete a product (DELETE)', () => {
    const productId = '1';

    service.deleteProduct(productId).subscribe(response => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/products/${productId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should verify a product (GET)', () => {
    const productId = '1';
    const verificationResponse = { valid: true };

    service.verificationProduct(productId).subscribe(response => {
      expect(response).toEqual(verificationResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}/products/verification/${productId}`);
    expect(req.request.method).toBe('GET');
    req.flush(verificationResponse);
  });
});
