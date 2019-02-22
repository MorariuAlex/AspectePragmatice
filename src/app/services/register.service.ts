import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {tap} from 'rxjs/operators';
import {LoginService} from './login.service';
import {RegistrationDataModel} from '../models/registration-data.model';

@Injectable()
export class RegisterService {

  constructor(private httpClient: HttpClient, private loginService: LoginService) {

  }

  register(registerData: RegistrationDataModel) {
    return this.httpClient.post<string>(environment.apiUrl + '/auth/register', registerData)
    .pipe(tap(token => this.loginService.storeToken(token)));
  }
}
