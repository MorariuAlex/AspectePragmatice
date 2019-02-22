import {Component, OnInit} from '@angular/core';
import {RegisterService} from '../../services/register.service';
import {RegistrationDataModel} from '../../models/registration-data.model';
import {Router} from '@angular/router';
import {CityModel} from '../../models/city.model';
import {CitiesService} from '../../services/cities.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerData = new RegistrationDataModel();
  birth_date: Date;

  constructor(
    private registerService: RegisterService,
    private router: Router,
    private cityService: CitiesService,
    public datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.getCities();
  }

  register(): void {
    this.registerData.birth_date = this.datePipe.transform(this.birth_date, 'yyyy-MM-dd');
    this.registerService.register(this.registerData)
    .subscribe(() => this.router.navigateByUrl('/dashboard'));
  }

  get cities(): CityModel[] {
    return this.cityService.cities;
  }

  getCities() {
    this.cityService.initCities();
  }


}
