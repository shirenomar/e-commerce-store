import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { ProductItemComponent } from './user-dashboard/product-item/product-item.component';
import { AuthGuard } from '../../core/guards/auth.guard';
import { AuthAdminGuard } from '../../core/guards/auth.user.guard';
import { AuthUserGuard } from '../../core/guards/auth.admin.guard';
import { SharedModule } from 'src/app/shared/shared.module';


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



