import { Observable, Subscription } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { tap } from 'rxjs/internal/operators/tap';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { of } from 'rxjs/internal/observable/of';


@Injectable()
export class LoginService {
  constructor(
    private injector: Injector,
    private router: Router
  ) { }

  request: string;

  loginRequest(identity: string, password: string): Observable<any> {
    return this.injector
      .get(AuthService).login(identity, password).pipe(
        tap(data => this.setTokenLoginRequest(data)),
        catchError(err => {
          throw new Error(err);
        })
      );
  }

  setTokenLoginRequest(data): void {
    return this.injector.get(AuthService).setTokens(data.token);
  }

  isAuthenticated(): Observable<boolean> {
    return this.injector.get(AuthService).isLoggedIn$;
  }
}
