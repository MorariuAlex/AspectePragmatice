import {Component, OnInit} from '@angular/core';
import {JobSearchModel} from '../../models/JobSearch.model';
import {JobPostingService} from '../../services/job-posting.service';
import {JobPostingModel} from '../../models/job-posting.model';
import {Router} from '@angular/router';
import {CityModel} from '../../models/city.model';
import {CitiesService} from '../../services/cities.service';
import {KeywordsService} from 'src/app/services/keywords.service';
import {Keyword} from 'src/app/models/keyword.model';
import {LoginService} from 'src/app/services/login.service';
import {DatePipe} from '@angular/common';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  searchModel = new JobSearchModel();
  myid: number;
  start_date: Date;
  end_date: Date;

  constructor(
    private loginService: LoginService,
    private userService: UserService,
    private jobService: JobPostingService,
    private keywordsService: KeywordsService,
    private router: Router,
    private cityService: CitiesService,
    public datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.searchJobs();
    this.cityService.initCities();
    this.jobService.initBestJobs();
    this.keywordsService.initTopKeywords();

    this.userService.inituser().then(() => {
      this.myid = this.userService.getUser().id;
      console.log(this.myid);
    });
  }

  get jobs(): JobPostingModel[] {
    return this.jobService.jobs;
  }

  jobById(id: number): string {
    return this.cities.find(city => city.id === id).name;
  }

  get bestJobs(): JobPostingModel[] {
    return this.jobService.bestJobs;
  }

  get topKeywords(): Keyword[] {
    return this.keywordsService.topKeyWords;
  }

  get cities(): CityModel[] {
    return this.cityService.cities;
  }

  searchJobs() {
    this.searchModel.startDate = this.datePipe.transform(this.start_date, 'yyy-MM-dd');
    this.searchModel.endDate = this.datePipe.transform(this.end_date, 'yyy-MM-dd');
    this.jobService.search(this.searchModel);
  }

  goToProfile() {
    localStorage.setItem('userType', 'employer');
    this.router.navigateByUrl('/profile');
  }

  goToJobPage(id: JobPostingModel) {
    console.log(id);
  }

  logout() {
    this.loginService.logout();
    this.router.navigateByUrl('');
  }

  becomeEmployer() {
    localStorage.setItem('userType', 'employer');
    this.router.navigateByUrl('/dashboard-employer');
  }
}
