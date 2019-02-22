import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-error-snackbar',
  templateUrl: './error-snackbar.component.html',
  styleUrls: ['./error-snackbar.component.scss']
})
export class ErrorSnackbarComponent implements OnInit {
  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    @Inject(MAT_SNACK_BAR_DATA) public errorRequest: any) {
  }

  ngOnInit() {
  }

  get status() {
    return this.errorRequest.status;
  }

  dismiss() {
    this.snackBar.dismiss();
    if (this.status === 401) {
      this.router.navigateByUrl('/login');
    }
  }

  get errorMessage(): any {
    if (this.status === 422) {
      return JSON.stringify(this.errorRequest.error.errors, null, 2);
    }
  }
}
