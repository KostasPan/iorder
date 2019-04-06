import { AuthGuard } from './services/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
    path: 'table/:id',
    loadChildren: './order/order/order.module#OrderPageModule',
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
