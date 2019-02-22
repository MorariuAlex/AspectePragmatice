import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user.model';
import {DatePipe} from '@angular/common';
import {SkillService} from '../../services/skill.service';
import {SkillSearchModel} from '../../models/skill-search.model';
import {SkillModel} from '../../models/skill.model';
import {CityModel} from '../../models/city.model';
import {CitiesService} from '../../services/cities.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  id: number;
  user = new User();
  newUser = new User();
  private update = false;
  idMe: number;
  private isMe = false;
  private city: string;
  private newCity: number;
  datePipe = new DatePipe('en-US');

  constructor(
    private activatedRoute: ActivatedRoute,
    private cityService: CitiesService,
    private userService: UserService,
    private skillService: SkillService,
    private router: Router) {
  }

  async ngOnInit() {
    this.id = +this.activatedRoute.snapshot.params['id'];
    await this.userService.inituser();
    this.idMe = this.userService.getUser().id;
    await this.userService.initById(this.id);
    this.user = this.userService.getUserById()[0];
    this.city = this.user.city.name;
    this.getCities();
    this.skillService.getMySkills(this.id);
    this.checkIfMe();
  }

  enableEdit() {
    this.update = true;
    this.newUser = JSON.parse(JSON.stringify(this.user));
  }

  updateUser() {
    if (this.newCity == null) {
      this.newCity = this.user.city.id;
    }
    this.newUser.birth_date = this.datePipe.transform(this.newUser.birth_date, 'dd-MM-yyyy');
    this.newUser.city_id = this.newCity;

    this.userService.updateUser(this.newUser).subscribe(() => {
      this.update = false;
    });

  }

  checkIfMe() {
    this.isMe = this.id === this.idMe;
  }

  get cities(): CityModel[] {
    return this.cityService.cities;
  }


  get skills(): SkillModel[] {
    return this.skillService.mySkills;
  }

  getCities() {
    this.cityService.search();

  }

}
