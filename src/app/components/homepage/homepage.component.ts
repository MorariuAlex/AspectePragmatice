import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  constructor(private router: Router) {
  }

  wantHire() {
    localStorage.setItem('userType', 'employer');
    this.router.navigateByUrl('/login');
  }

  wantWork() {
    localStorage.setItem('userType', 'employee');
    this.router.navigateByUrl('/login');
  }
}
