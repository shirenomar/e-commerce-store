import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../models/product';
import { Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductState } from '../enums/product-state.enum';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private productsUrl = `${environment.apiBaseUrl}/products`;
  private categories = `${this.productsUrl}/categories`;
  private productsByCategoryUrl = `${this.productsUrl}/category`



  constructor(private httpClient: HttpClient) { }

  getProductsList(cachedIsAllowed: boolean, category?: string): Observable<IProduct[]> {

    let itemsFromStorage = sessionStorage.getItem('cachedProducts');

    if (cachedIsAllowed && itemsFromStorage) {
      return of(JSON.parse(itemsFromStorage));
    } else {
      const productListUrl = category ? `${this.productsByCategoryUrl}/${category}` : this.productsUrl
      return this.httpClient.get<IProduct[]>(productListUrl)
        .pipe(tap((products) => {
          // store products in the session Storage
          this.setProductsInStorage(products)

        }));
    }
  }

  getCategoriesList(): Observable<string[]> {
    return this.httpClient.get<string[]>(this.categories);
  }

  addProduct(product: IProduct) {
    return this.httpClient.post<IProduct>(this.productsUrl, product).pipe(tap((item) => {
      this.updateStoredProducts(product, ProductState.Add);
    }));
  }

  updateProduct(product: IProduct) {
    return this.httpClient.put<IProduct>(`${this.productsUrl}/${product.id}`, product).pipe(tap((item) => {
      this.updateStoredProducts(product, ProductState.Update);
    }));;
  }

  deleteProduct(item: IProduct): Observable<IProduct> {
    return this.httpClient.delete<IProduct>(`${this.productsUrl}/${item.id}`).pipe(tap((_) => {
      this.updateStoredProducts(item, ProductState.Delete);
    }));;
  }

  updateStoredProducts(item: IProduct, action: ProductState) {
    let itemsFromStorage = sessionStorage.getItem('cachedProducts');

    if (itemsFromStorage) {
      let products = JSON.parse(itemsFromStorage) as IProduct[];

      switch (action) {
        case ProductState.Add:
          products.push(item);
          break;
        case ProductState.Update:
          products[item.id] = item;
          break;
        case ProductState.Delete:
          products = products.filter((product) => product.id !== item.id);
          break;
      }
      this.setProductsInStorage(products)


    }
  }

  setProductsInStorage(products: IProduct[]) {
    sessionStorage.setItem('cachedProducts', JSON.stringify(products));
  }

}
