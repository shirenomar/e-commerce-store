import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductsService } from 'src/app/core/services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html'
})
export class AddProductComponent {

  public addProductForm!: FormGroup;
  isItemAdded!: boolean;
  categories$ = this.productsService.getCategoriesList();
  constructor(private formBuilder: FormBuilder, private productsService: ProductsService, private dialogRef: MatDialogRef<AddProductComponent>, @Inject(MAT_DIALOG_DATA) public dialogData: number) { }

  ngOnInit() {
    this.buildAddProductForm()
  }

  buildAddProductForm() {
    this.addProductForm = this.formBuilder.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.maxLength(80)],
      image: [''],
      category: ['', Validators.required],
    });
  }

  uploadImage() { } // TODO

  addNewProduct() {
    if (this.addProductForm.invalid) {
      this.addProductForm.markAllAsTouched()
      return;
    };
    this.productsService.addProduct({
      id: this.dialogData,
      ...this.addProductForm.value
    }
    ).subscribe((product) => this.dialogRef.close(product));
  }

}
