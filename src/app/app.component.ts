import { IpAddressService } from './services/ip-address.service';
import { TokenService } from './services/token.service';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private tokenService: TokenService,
    private router: Router,
    private ipService: IpAddressService
  ) {
    this.initializeApp();
    // if (there are admins in database) {

    // } else {
    this.ipService.getIpAddress().then((ip) => {
      if (ip) {
        this.ipService.setBASEURL(ip);
      }
    });
    this.automaticLogin();
    // }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // this.statusBar.styleDefault();
      this.statusBar.styleBlackTranslucent();
      this.splashScreen.hide();
    });
  }

  // TODO: allagi! kathe fora pou epilegw url apo tin bara
  //       epistrefw ksana sto ../tables
  automaticLogin() {
    this.tokenService.getAuthTokenStorage().then((authToken) => {
      if (authToken) {
        this.router.navigate(['/tables']);
      } else {
        this.router.navigate(['/']);
      }
    });
  }
}
