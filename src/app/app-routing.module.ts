import { AdminGuard } from './services/admin.guard';
import { AuthGuard } from './services/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
  {
    path: 'add-users',
    loadChildren: './users/add-users/add-users.module#AddUsersPageModule',
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'payments',
    loadChildren: './users/payments/payments.module#PaymentsPageModule',
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'catalogue',
    loadChildren: './products/catalogue/catalogue.module#CataloguePageModule',
    canActivate: [AuthGuard, AdminGuard]
  },
  {
    path: 'show-tables-details',
    loadChildren:
      './tables/show-tables-details/show-tables-details.module#ShowTablesDetailsPageModule',
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
