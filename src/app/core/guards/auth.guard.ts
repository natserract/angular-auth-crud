import { Injectable, Injector } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { first, map, take, takeLast } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private injector: Injector,
    private router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.injector.get(AuthService).isLoggedIn$.pipe(
      map(
        isLoggedIn => {
          if (!isLoggedIn) {
            this.router.navigate(['/login']);
          }

          return isLoggedIn;
        }),
      first()
    );
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.injector.get(AuthService).isLoggedIn$.pipe(
      map(
        isLoggedIn => {
          if (!isLoggedIn) {
            this.router.navigate(['/login']);
          }
          return isLoggedIn;
        }),
      first()
    );
  }

  canLoad(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.injector.get(AuthService).isLoggedIn$.pipe(
      map(
        isLoggedIn => {
          console.log(isLoggedIn);
          return isLoggedIn;
        }),
      first()
    );
  }

}
