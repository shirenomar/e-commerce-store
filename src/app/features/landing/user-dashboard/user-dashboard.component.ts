import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html'
})
export class UserDashboardComponent implements OnInit {

  constructor(private productsService: ProductsService) { }
  products$ = this.productsService.getProductsList();
  categories$ = this.productsService.getCategoriesList();
  events: string[] = [];
  opened: boolean = false;

  ngOnInit(): void {
  }

  onSelectCategory(event: any) {
    console.log(event)
    this.products$ = this.productsService.getProductsList(event.value);
  }
}

