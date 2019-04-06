import { UserPopoverComponent } from './../../popovers/user-popover/user-popover.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TablesPage } from './tables.page';
import { TokenService } from '../../services/token.service';
import { TablesService } from './../tables.service';

const routes: Routes = [
  {
    path: '',
    component: TablesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  entryComponents: [UserPopoverComponent],
  declarations: [TablesPage, UserPopoverComponent],
  providers: [TokenService, TablesService]
})
export class TablesPageModule {}
