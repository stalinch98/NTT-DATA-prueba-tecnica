import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductInterface } from './interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = environment.apiUrl;

  constructor(private _http: HttpClient) { }

  getAllProducts(): Observable<any> {
    return this._http.get<any>(`${this.apiUrl}/products`);
  }

  createProduct(product: ProductInterface): Observable<any> {
    return this._http.post<any>(`${this.apiUrl}/products`, product);
  }

  updateProduct(product: ProductInterface): Observable<any> {
    return this._http.put<any>(`${this.apiUrl}/products/${product.id}`, product);
  }

  deleteProduct(id: string): Observable<any> {
    return this._http.delete<any>(`${this.apiUrl}/products/${id}`);
  }

  verificationProduct(id: string): Observable<any> {
    return this._http.get<any>(`${this.apiUrl}/products/verification/${id}`);
  }

}
