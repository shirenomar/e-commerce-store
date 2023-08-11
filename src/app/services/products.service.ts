import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../models/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productsUrl = 'https://fakestoreapi.com/products';
  private categories = 'https://fakestoreapi.com/products/categories';
  private productsByCategoryUrl = 'https://fakestoreapi.com/products/category'



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
