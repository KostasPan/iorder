import { ModalController } from '@ionic/angular';
import { SetUserModalComponent } from './../set-user-modal/set-user-modal.component';
import { AlertService } from './../../services/alert.service';
import { UsersService } from './../users.service';
import { Component, OnInit } from '@angular/core';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss']
})
export class UsersPage implements OnInit {
  users = [];

  constructor(
    private usersService: UsersService,
    private alertService: AlertService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.initUsers();
  }

  initUsers() {
    this.usersService.getUsers().subscribe(data => {
      console.log(data.users);
      this.users = data.users;
    });
  }

  async deleteUser(user) {
    const choice = await this.alertService
      .presentAlertChoices(
        'User Deletion',
        'Confirm',
        'Would you like to permanently delete user `' + user.username + '` ?'
      )
      .then(c => {
        return c;
      });

    if (choice.data === true) {
      console.log(choice.data);
      this.usersService.deleteUser({ userId: user._id }).subscribe(data => {
        this.removeUserFromList(user);
      });
    }
  }

  removeUserFromList(user) {
    this.users.splice(this.users.indexOf(user), 1);
  }

  async setUserModal(user) {
    const modal: HTMLIonModalElement = await this.modalController.create({
      component: SetUserModalComponent,
      cssClass: 'details-modal-css-50',
      componentProps: {
        _id: user._id,
        username: user.username,
        admin: user.admin
      }
    });
    modal.onDidDismiss().then((detail: OverlayEventDetail) => {
      if (detail.data) {
        if (detail.data.customized === true) {
          const index = this.users.indexOf(user);
          this.users[index].admin = detail.data.admin;
          this.users[index].username = detail.data.username;
        }
      }
    });

    await modal.present();
  }
}
