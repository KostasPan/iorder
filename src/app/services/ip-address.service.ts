import { environment as ENV } from './../../environments/environment';
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IpAddressService {
  ipAddress = 'ipaddress';

  constructor(private storage: Storage) {}

  setIpAddress(ip: string) {
    return this.storage.set(this.ipAddress, ip).then(() => {
      this.setBASEURL(ip);
      // console.log('New server ip set on storage.');
    });
  }

  setBASEURL(ip: string) {
    ENV.BASEURL = 'http://' + ip + ':3000/api/iOrder';
    // console.log('new baseurl edit', ENV.BASEURL);
  }

  hasIpAddress() {
    return this.storage.get(this.ipAddress).then((ip) => {
      if (ip) {
        return true;
      } else {
        return false;
      }
    });
  }

  getIpAddress() {
    return this.storage.get(this.ipAddress);
  }
}
