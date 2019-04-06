import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';
import { HttpClientModule } from '@angular/common/http';

import { LoadingService } from './../../services/loading.service';
import { AuthService } from '../auth.service';
import { ToastService } from './../../services/toast.service';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginPage],
  providers: [AuthService, ToastService, LoadingService]
})
export class LoginPageModule {}
