import { Component, OnInit } from '@angular/core';

import { AppApiService } from 'src/app/services/app-api.service';
import { PopService } from '../../services/pop.service';
import { Ijob_type } from '../classes/jobs-type';

export class jobs {
  constructor (
    public job_id : String,
    public salary : Number,
    public description : String,
    public due_date : String,
    public positions_avaliable : Number,
    public company_id : String
  ){  }
}

@Component({
  selector: 'app-create-jobs',
  templateUrl: './create-jobs.component.html',
  styleUrls: ['./create-jobs.component.css']
})
export class CreateJobsComponent implements OnInit {

  job  = new jobs('',1000,'','',1,localStorage.getItem('userId'));
  job_type : Ijob_type[];

  constructor(private _appApi$ : AppApiService,
              private _PopAPi$ : PopService) { }

  ngOnInit() {
    this._appApi$.getJobTypesList().subscribe(
      res => {
        this.job_type = res.doc;
        console.log(this.job_type);
      },
      err => this._PopAPi$.showSnack('Job Listed Loading failed')
    )
  }

  clear(){
    this.job= new jobs('',1000,'','',1,localStorage.getItem('userId'));
  }

  create() {
    console.log(this.job);
    this._appApi$.createJob(this.job).subscribe(
      (res) => {
        console.log(res.message);
        this._PopAPi$.showSnack(res.message);
      },
      err => this._PopAPi$.showSnack(err.message)
    )
  }
}
