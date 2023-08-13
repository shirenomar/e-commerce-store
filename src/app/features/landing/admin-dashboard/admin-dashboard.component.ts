import { Component } from '@angular/core';
import { BehaviorSubject, switchMap } from 'rxjs';
import { IProduct } from 'src/app/core/models/product';
import { ProductsService } from 'src/app/core/services/products.service';
import { UsersUtils } from 'src/app/shared/utils/users.utils';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent {
  displayedColumns: string[] = ['id', 'title', 'category', 'price', 'remove', "Edit"];
  columnsSchema: any = UsersUtils.COLUMNS_SCHEMA;
  editMode: boolean = false;
  getProducts$ = new BehaviorSubject(true);
  products$ = this.getProducts$.pipe(switchMap(() => this.productsService.getProductsList()));
  categories$ = this.productsService.getCategoriesList();
  constructor(private productsService: ProductsService) { }

  removeProduct(id: number) {
    this.productsService.deleteProduct(id).subscribe(() => this.getProducts$.next(true));

  }

  updateProduct(row: IProduct) {
    this.productsService.updateProduct(row).subscribe(() => this.editMode = false);
  }
}
