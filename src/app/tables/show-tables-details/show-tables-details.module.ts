import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ShowTablesDetailsPage } from './show-tables-details.page';

const routes: Routes = [
  {
    path: '',
    component: ShowTablesDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ShowTablesDetailsPage]
})
export class ShowTablesDetailsPageModule {}
