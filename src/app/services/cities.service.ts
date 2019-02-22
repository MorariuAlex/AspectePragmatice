import {Injectable} from '@angular/core';
import {CityModel} from '../models/city.model';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class CitiesService {
  private _cities: CityModel[] = [];

  constructor(private http: HttpClient) {
  }

  public search() {
    this.http.get<CityModel[]>(environment.apiUrl + '/cities')
      .subscribe(value => this._cities = value);
  }

  public initCities() {
    this.http.get<CityModel[]>(environment.apiUrl + '/cities')
      .subscribe(value => this._cities = value);
  }

  get cities(): CityModel[] {
    return this._cities;
  }

}
