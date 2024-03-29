import { AlertService } from './alert.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private alertService: AlertService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.tokenService.getAuthTokenStorage().then(token => {
      if (token) {
        return true;
      } else {
        this.alertService.presentAlertDeathLogout(
          'Your key has expired. You need to login again.'
        );
        return false;
      }
    });
  }
}
