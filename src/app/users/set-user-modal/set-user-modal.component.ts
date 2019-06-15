import { ToastService } from './../../services/toast.service';
import { UsersService } from './../users.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-set-user-modal',
  templateUrl: './set-user-modal.component.html',
  styleUrls: ['./set-user-modal.component.scss']
})
export class SetUserModalComponent implements OnInit {
  setUserForm: FormGroup;
  username = '';
  admin;
  _id;

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this._id = this.navParams.get('_id');
    this.username = this.navParams.get('username');
    this.admin = this.navParams.get('admin');
    this.init();
  }

  init() {
    this.setUserForm = this.formBuilder.group({
      username: [this.username, Validators.required],
      password: ['', Validators.required],
      admin: [this.admin]
    });
  }

  setUser() {
    this.setUserForm.value.userId = this._id;
    this.usersService.setUser(this.setUserForm.value).subscribe(data => {
      this.toastService.presentToast(data.message);
      this.setUserForm.value.customized = true;
      this.myDismiss();
    });
  }

  async myDismiss() {
    await this.modalController.dismiss(this.setUserForm.value);
  }
}
