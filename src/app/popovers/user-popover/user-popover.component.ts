import { TokenService } from './../../services/token.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-user-popover',
  templateUrl: './user-popover.component.html',
  styleUrls: ['./user-popover.component.scss']
})
export class UserPopoverComponent implements OnInit {
  constructor(
    private tokenService: TokenService,
    private router: Router,
    public popoverController: PopoverController
  ) {}

  ngOnInit() {}

  logout() {
    this.popoverController.dismiss();
    this.tokenService.deleteAuthToken();
    this.tokenService.deleteAuthTokenStorage();
    this.router.navigate(['/login']);
  }
}
