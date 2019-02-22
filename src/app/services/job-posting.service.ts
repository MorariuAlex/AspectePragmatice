import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JobPostingModel} from '../models/job-posting.model';
import {JobSearchModel} from '../models/JobSearch.model';
import {environment} from '../../environments/environment';
import {JobData} from '../models/job-data.model';

@Injectable({
  providedIn: 'root'
})
export class JobPostingService {

  private _jobs: JobPostingModel[] = [];
  private _myJobs: JobPostingModel[] = [];
  private _bestJobs: JobPostingModel[] = [];
  private _curentJob: JobPostingModel;

  constructor(private httpClient: HttpClient) {
  }

  public search(searchModel: JobSearchModel) {
    this.httpClient.get<JobPostingModel[]>(environment.apiUrl + '/jobs', {params: <any>searchModel})
      .subscribe(value => this._jobs = value);
  }

  get jobs(): JobPostingModel[] {
    return this._jobs;
  }

  public initBestJobs() {
    this.httpClient.get<JobPostingModel[]>(environment.apiUrl + '/jobs/top')
      .subscribe(value => this._bestJobs = value.slice(0, 5));
  }

  public initMyJobs() {
    this.httpClient.get<JobPostingModel[]>(environment.apiUrl + '/user/jobs')
      .subscribe(value => this._myJobs = value);
  }

  get bestJobs(): JobPostingModel[] {
    return this._bestJobs;
  }

  public async getJobInfo(id: number) {
    this.httpClient.get<JobPostingModel>(environment.apiUrl + '/jobs/' + id).subscribe(value => this._curentJob = value);
  }

  get currentJob(): JobPostingModel {
    return this._curentJob;
  }

  get myJobs(): JobPostingModel[] {
    return this._myJobs;
  }

  public apply(id: number) {
    return this.httpClient.post(environment.apiUrl + '/jobs/apply', {'job_id': id, 'status': 0});
  }

  public createJob(job: JobData) {
    this.httpClient.post(environment.apiUrl + '/jobs', job).subscribe(() => this.initMyJobs());
  }

  public deleteJob(id: number) {
    this.httpClient.delete(environment.apiUrl + '/jobs/' + id).subscribe(() => this.initMyJobs());
  }

}
