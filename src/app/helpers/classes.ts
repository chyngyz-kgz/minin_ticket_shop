import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../services/authorization.service';
import { ErrorService } from '../services/error.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authorizationService: AuthorizationService,
    private errorService: ErrorService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const currentUser = this.authorizationService.currentUserValue;
    if (currentUser) {
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { retnUrl: state.url } });
    this.errorService.handle(
      'Bitte melden Sie sich an, um auf diese Seite zuzugreifen'
    );

    return false;
  }
}

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authorizationService: AuthorizationService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let currentUserToken = this.authorizationService.currentUserValue;
    if (currentUserToken) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUserToken}`,
        },
      });
    }

    return next.handle(req);
  }
}
