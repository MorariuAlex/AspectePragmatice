import {Injectable} from '@angular/core';
import {User} from '../models/user.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {tap} from 'rxjs/internal/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _user: User;
  private _userById: User;
  private _users: User[];

  constructor(private httpClient: HttpClient) {
  }

  public inituser() {
    return this.httpClient.get<User>(environment.apiUrl + '/auth/me')
      .pipe(tap(value => {
        this._user = value;
      })).toPromise();
  }

  public initById(id: number) {
    return this.httpClient.get<User>(environment.apiUrl + '/user/' + id)
      .pipe(tap(value => {
        this._userById = value;
      })).toPromise();
  }

  public getUserById() {
    return this._userById;
  }

  public getUser() {
    return this._user;
  }

  public updateUser(user: User) {
    return this.httpClient.post(environment.apiUrl + '/user/profile', user);
  }


  public searchUsers(skill_name: string) {
    return this.httpClient.get<User[]>(environment.apiUrl + '/users', {params: {'skill_name': skill_name}})
      .subscribe(value => this._users = value);
  }

  get users(): User[] {
    return this._users;
  }
}
