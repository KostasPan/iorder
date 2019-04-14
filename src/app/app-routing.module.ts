import { AuthGuard } from './services/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderPageModule } from './order/order/order.module';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './auth/login/login.module#LoginPageModule' },
  {
    path: 'add-tables',
    loadChildren: './tables/add-tables/add-tables.module#AddTablesPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'tables',
    loadChildren: './tables/tables/tables.module#TablesPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'order/:id',
    loadChildren: './order/order/order.module#OrderPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'categories',
    loadChildren:
      './products/categories/categories.module#CategoriesPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'categories/:category',
    loadChildren: './products/products/products.module#ProductsPageModule',
    canActivate: [AuthGuard]
  }

  // redirect to home
  // { path: '**', redirectTo: 'tables' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
