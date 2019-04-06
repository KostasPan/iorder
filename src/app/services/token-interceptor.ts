import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';

// import { Observable } from 'rxjs';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { TokenService } from './token.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private tokenService: TokenService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const headersConfig = {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    };

    const token = this.tokenService.getAuthToken();

    if (token) {
      headersConfig['Authorization'] = `Bearer ${token}`;
    }
    const _req = req.clone({
      setHeaders: headersConfig
      // withCredentials: true
    });

    return next.handle(_req);

    // console.log('CLONE=> ' + req.clone);
    // return next.handle(req);
  }
}
