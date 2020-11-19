import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private authService: AuthService,
    private router: Router
  ) {

    this.authService.isLoggedIn$.subscribe(loggedIn => {
      if (loggedIn) {
        this.router.navigateByUrl('dashboard');
      }
    });

    this.forms = this.formBuilder.group({
      loginUsername: '',
      loginPassword: ''
    });
  }

  forms: FormGroup;
  isSubmitted = false;

  ngOnInit(): void {
  }

  submit(_) {
    if (this.forms.valid) {
      this.isSubmitted = true;

      const username = this.forms.get('loginUsername').value;
      const password = this.forms.get('loginPassword').value;

      this.loginService.loginRequest(username, password).subscribe(
        (result) => {
          this.loginService.isAuthenticated().subscribe(loggedIn => {
            if (loggedIn) {
              this.router.navigateByUrl('dashboard');
              this.isSubmitted = false;
            }
          });
        },
        (error) => {
          this.isSubmitted = false;
          location.reload();
        }
      );
    }
  }
}
