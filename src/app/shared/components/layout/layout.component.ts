import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  constructor(
    private activeRoute: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.activeRoute.parent.data.subscribe(data => {
      const bodyEl = document.querySelector('body');
      const activeurl = this.activeRoute.parent.routeConfig.path;

      if (bodyEl !== undefined || bodyEl !== null) {
        bodyEl.className = `page-${activeurl}`;
      }
    });
  }


  logoutSession() {
    return this.authService.logout();
  }
}
