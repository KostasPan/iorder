import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  authToken = 'auth';
  // authToken = 'token';

  constructor(private cookieService: CookieService, private storage: Storage) {}

  setAuthToken(token: string) {
    this.cookieService.set(this.authToken, token);
  }
  setAuthTokenStorage(token: string) {
    return this.storage.set(this.authToken, token);
  }

  getAuthToken() {
    // await this.storage
    //   .get(this.authToken)
    //   .then(data => console.log('test: ' + data));
    return this.cookieService.get(this.authToken);
  }

  getAuthTokenStorage() {
    return this.storage.get(this.authToken);
  }

  deleteAuthToken() {
    this.cookieService.delete(this.authToken);
  }
  deleteAuthTokenStorage() {
    this.storage.remove(this.authToken);
  }

  getAuthPayloadCookie() {
    // jwt xxxx.yyyy.zzzz
    const token = this.getAuthToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = JSON.parse(window.atob(payload));
    }
    return payload;
  }

  async getAuthStoragePayload() {
    const token = await this.storage.get(this.authToken);
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = JSON.parse(window.atob(payload));
    }
    return payload;
  }
}
