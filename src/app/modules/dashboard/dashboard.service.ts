import { Observable } from 'rxjs';
import { Injectable, Injector } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { tap } from 'rxjs/internal/operators/tap';

@Injectable()
export class DashboardService {
  constructor(
      private injector: Injector
  ) {}

  request: string;

  logoutRequest(): void {
    return this.injector
      .get(AuthService).logout();
  }
}
