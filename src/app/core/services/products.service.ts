import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../models/product';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productsUrl = `${environment.apiBaseUrl}/products`;
  private categories = `${this.productsUrl}/categories`;
  private productsByCategoryUrl = `${this.productsUrl}/category`



  constructor(private httpClient: HttpClient) { }

  getProductsList(category?: string): Observable<IProduct[]> {
    const productListUrl = category ? `${this.productsByCategoryUrl}/${category}` : this.productsUrl
    return this.httpClient.get<IProduct[]>(productListUrl);
  }

  getCategoriesList(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.categories);
  }

  addProduct(product: IProduct) {
    return this.httpClient.post(this.productsUrl, product);
  }

  updateProduct(product: IProduct) {
    return this.httpClient.put(`${this.productsUrl}/${product.id}`, product);
  }

  deleteProduct(id: number) {
    return this.httpClient.delete(`${this.productsUrl}/${id}`);
  }

}
