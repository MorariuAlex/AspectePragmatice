import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {tap} from 'rxjs/operators';
import {LoginDataModel} from '../models/login-data.model';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) {
  }

  public login(loginData: LoginDataModel) {
    return this.http.post<string>(environment.apiUrl + '/auth/login', loginData)
    .pipe(tap(token => {
      this.storeToken(token);
    }));

  }

  public storeToken(token: string) {
    localStorage.setItem('jwtToken', token);
  }

  public logout() {
    return this.http.post<any>(environment.apiUrl + '/auth/logout', null)
    .subscribe(() => {
      localStorage.removeItem('jwtToken');
      localStorage.removeItem('userType');
    },
    error => {console.log(error); }
    );
  }


}
