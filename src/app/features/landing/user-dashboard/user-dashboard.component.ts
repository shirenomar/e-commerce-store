import { Component, OnInit } from '@angular/core';
import { ProductsUtils } from '../../../shared/utils/products.utils'
import { FADEINOUT } from 'src/app/core/animations/fade-in-fade-out.animation';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  animations: [FADEINOUT],
})
export class UserDashboardComponent implements OnInit {

  constructor(private productsService: ProductsService) { }
  products$ = this.productsService.getProductsList(false);
  categories!: { name: string, icon: string }[];
  events: string[] = [];
  opened: boolean = false;

  ngOnInit(): void {
  }

  onSelectCategory(event: string) {
    this.products$ = this.productsService.getProductsList(false, event);
  }

  showItems() {
    this.categories = ProductsUtils.Categories;
  }


}

