import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AddTablesPage } from './add-tables.page';
// import { HttpClientModule } from '@angular/common/http';
import { TablesService } from '../tables.service';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';

const routes: Routes = [
  {
    path: '',
    component: AddTablesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // HttpClientModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AddTablesPage],
  providers: [TablesService, ToastService, LoadingService]
})
export class AddTablesPageModule {}
