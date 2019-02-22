import {Component, OnInit} from '@angular/core';
import {JobPostingModel} from 'src/app/models/job-posting.model';
import {ActivatedRoute, Router} from '@angular/router';
import {JobPostingService} from 'src/app/services/job-posting.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-job-posting',
  templateUrl: './job-posting.component.html',
  styleUrls: ['./job-posting.component.css']
})
export class JobPostingComponent implements OnInit {
  id: number;

  constructor(private _activatedroute: ActivatedRoute, private jobPostingService: JobPostingService, private router: Router,
    public datePipe: DatePipe) {
  }

  async ngOnInit() {
    this.id = this._activatedroute.snapshot.params['id'];
    await this.jobPostingService.getJobInfo(this.id);
  }

  get job(): JobPostingModel {
    return this.jobPostingService.currentJob;
  }

  applyForJob() {
    this.jobPostingService.apply(this.id).subscribe(
      () => this.router.navigateByUrl('dashboard'),
      error => this.router.navigateByUrl('login')
    );
  }
}
