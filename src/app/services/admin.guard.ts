import { AlertService } from './alert.service';
import { TokenService } from './token.service';
import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(
    private tokenService: TokenService,
    private alertService: AlertService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.tokenService.getAuthStoragePayload().then(payload => {
      const isAdmin = payload.data.admin;
      if (!isAdmin) {
        this.alertService.presentAlert(
          'Warning',
          '',
          'You need administrator permission to proceed.'
        );
        this.router.navigate(['tables']);
      }
      return isAdmin;
    });
  }
}
