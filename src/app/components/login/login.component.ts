import {Component, OnInit} from '@angular/core';
import {AuthGuard} from 'src/app/guards';
import {ActivatedRoute, Router} from '@angular/router';
import {LoginService} from 'src/app/services/login.service';
import {LoginDataModel} from '../../models/login-data.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData = new LoginDataModel();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: LoginService) {
  }

  login() {
    this.authService.login(this.loginData).subscribe(() => {
      if (localStorage.getItem('userType') === 'employer') {
        this.router.navigateByUrl('dashboard-employer');
      } else if (localStorage.getItem('userType') === 'employee') {
        this.router.navigateByUrl('dashboard');
      } else {
        this.router.navigateByUrl('');
      }
    });
  }

}

