import {Component, OnInit} from '@angular/core';
import {SkillSearchModel} from '../../models/skill-search.model';
import {Router} from '@angular/router';
import {JobPostingService} from 'src/app/services/job-posting.service';
import {CitiesService} from 'src/app/services/cities.service';
import {JobPostingModel} from 'src/app/models/job-posting.model';
import {CityModel} from 'src/app/models/city.model';
import {JobData} from 'src/app/models/job-data.model';
import {UserService} from 'src/app/services/user.service';
import {User} from 'src/app/models/user.model';
import {LoginService} from 'src/app/services/login.service';
import {DatePipe} from '@angular/common';


interface Profile {
  name: string;
  route: string;
}

@Component({
  selector: 'app-dashboard-employer',
  templateUrl: './dashboard-employer.component.html',
  styleUrls: ['./dashboard-employer.component.scss']
})


export class DashboardEmployerComponent implements OnInit {
  profilesList: Profile[];

  searchModel = new SkillSearchModel();

  job = new JobData();
  myid: number;
  skill_name = '';

  start_date: Date;
  end_date: Date;

  constructor(
    private router: Router,
    private jobService: JobPostingService,
    private cityService: CitiesService,
    private userService: UserService,
    private loginService: LoginService,
    private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.jobService.initMyJobs();
    this.cityService.initCities();
    this.userService.searchUsers(this.skill_name);

    this.userService.inituser().then(() => {
      this.myid = this.userService.getUser().id;

    });
  }


  navigate(user: User) {
    console.log(user);
    this.router.navigate(['/profile/' + user.id]);
  }

  get myJobs(): JobPostingModel[] {
    return this.jobService.myJobs;
  }

  get cities(): CityModel[] {
    return this.cityService.cities;
  }

  get users(): User[] {
    return this.userService.users;
  }

  onSubmit() {
    this.job.start_date = this.datePipe.transform(this.start_date, 'yyyy-MM-dd');
    this.job.end_date = this.datePipe.transform(this.end_date, 'yyyy-MM-dd');
    this.jobService.createJob(this.job);
  }

  public searchUsers() {
    this.userService.searchUsers(this.skill_name);
  }

  public logout() {
    this.loginService.logout();
    this.router.navigateByUrl('');
  }

  becomeEmployee() {
    localStorage.setItem('userType', 'employee');
    this.router.navigateByUrl('/dashboard');
  }

  deleteJob(id: number) {
    this.jobService.deleteJob(id);
  }

}
