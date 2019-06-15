import { ToastService } from 'src/app/services/toast.service';
import { UsersService } from './../users.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.page.html',
  styleUrls: ['./add-users.page.scss']
})
export class AddUsersPage implements OnInit {
  addUsersForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.init();
  }

  init() {
    this.addUsersForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      admin: [false]
    });
  }

  addUsers() {
    if (this.addUsersForm.value.admin === null) {
      this.addUsersForm.value.admin = false;
    }
    this.usersService.addUsers(this.addUsersForm.value).subscribe(data => {
      this.toastService.presentToast(data.message);
      this.addUsersForm.reset();
    });
  }
}
