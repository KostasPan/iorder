import { AdminGuard } from './services/admin.guard';
import { AuthGuard } from './services/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderPageModule } from './order/order/order.module';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './auth/login/login.module#LoginPageModule' },
  {
    path: 'tables',
    loadChildren: './tables/tables/tables.module#TablesPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'add-tables',
    loadChildren: './tables/add-tables/add-tables.module#AddTablesPageModule',
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'order/:tname/:id',
    loadChildren: './order/order/order.module#OrderPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'order/:tname/:id/:cat',
    loadChildren:
      './products/categories/categories.module#CategoriesPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'order/:tname/:id/:cat/:category',
    loadChildren: './products/products/products.module#ProductsPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'details',
    loadChildren:
      './products/details/details-page/details.module#DetailsPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    loadChildren: './users/users/users.module#UsersPageModule',
    canActivate: [AuthGuard, AdminGuard]
  },

  // redirect to home
  { path: '**', redirectTo: 'tables' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
