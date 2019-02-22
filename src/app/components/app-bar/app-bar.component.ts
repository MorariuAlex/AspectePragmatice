import {Component, OnInit} from '@angular/core';
import {LoginService} from 'src/app/services/login.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss']
})
export class AppBarComponent implements OnInit {
  private userType: string;
  private myid: number;


  constructor(private loginService: LoginService, private userService: UserService, private router: Router) {
  }

  ngOnInit() {
    this.userType = this.getUserType();

    this.userService.inituser().then(() => {
      this.myid = this.userService.getUser().id;

    });

  }

  getUserType() {
    if (localStorage.getItem('userType') === 'employer') {
      return 'employee';
    }
    return 'employer';
  }

  logout() {
    this.loginService.logout();
    this.router.navigateByUrl('');
  }

  becomeEmployer() {
    this.userType = localStorage.getItem('userType');
    console.log(this.userType);
    if (this.userType === 'employer') {
      localStorage.setItem('userType', 'employee');
      this.router.navigateByUrl('/dashboard');
    } else {
      localStorage.setItem('userType', 'employer');
      this.router.navigateByUrl('/dashboard-employer');
    }

  }
}
