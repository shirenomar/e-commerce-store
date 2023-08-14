import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

const MatModules = [
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  FormsModule,
  MatToolbarModule,
  ReactiveFormsModule,
  MatButtonModule,
  MatGridListModule,
  MatListModule,
  MatSidenavModule,
  MatIconModule,
  MatTableModule,
  MatPaginatorModule,
  MatMenuModule,
  MatSelectModule,
  MatDialogModule

]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...MatModules

  ], exports: [...MatModules]
})
export class SharedModule { }
