import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './core/services/auth.service';
import { AppStateTypes } from './store/types/root.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'crud';

  constructor(
    private authService: AuthService,
    private store$: Store<AppStateTypes>,
  ){}

  ngOnInit() {
    this.authService.checkAuthenticated();
  }
}
