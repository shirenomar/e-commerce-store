import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ProductItemComponent } from './user-dashboard/product-item/product-item.component';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../guards/auth.guard';
import { AuthAdminGuard } from '../guards/auth.user.guard';
import { AuthUserGuard } from '../guards/auth.admin.guard';


const routes: Routes = [

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'user-home',
  },
  {

    path: '',
    component: LandingComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'admin-home',
        component: AdminDashboardComponent,
        canActivate: [AuthAdminGuard],
      },
      {
        path: 'user-home',
        component: UserDashboardComponent,
        canActivate: [AuthUserGuard],
      }
    ]
  },


];

@NgModule({
  declarations: [
    AdminDashboardComponent,
    UserDashboardComponent,
    ProductItemComponent,
    LandingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class LandingModule { }



