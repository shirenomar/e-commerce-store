import { Component, OnInit, ViewChild } from '@angular/core';
import { IProduct } from 'src/app/core/models/product';
import { ProductsService } from 'src/app/core/services/products.service';
import { UsersUtils } from 'src/app/shared/utils/users.utils';
import { MatDialog } from '@angular/material/dialog';
import { AddProductComponent } from './add-product/add-product.component';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'category', 'price', 'remove', "Edit"];
  columnsSchema: any = UsersUtils.COLUMNS_SCHEMA;
  editMode: boolean = false;
  dataSource!: IProduct[];
  categories$ = this.productsService.getCategoriesList();
  @ViewChild(MatTable) table!: MatTable<any>;

  constructor(private productsService: ProductsService, private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.productsService.getProductsList(true).subscribe((products) => this.dataSource = products);
  }

  removeProduct(id: number) {
    this.productsService.deleteProduct(id).subscribe((product) => {
      this.dataSource = this.dataSource.filter((item) => item.id !== product.id)
    });

  }

  updateProduct(row: IProduct) {
    this.productsService.updateProduct(row).subscribe(() => {
      this.editMode = false
    });
  }

  addNewProduct() {
    // Generate New ID
    let newId = this.dataSource?.length + 1;

    // Open Add Product Dialog
    this.matDialog.open(AddProductComponent, {
      data: newId
    }).afterClosed().subscribe((newProduct) => {
      this.dataSource.push(newProduct)
      this.table.renderRows();
    })
  }
}
