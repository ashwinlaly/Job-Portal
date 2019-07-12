import { Component, OnInit } from '@angular/core';
import { AppApiService } from 'src/app/services/app-api.service';
import { PopService } from 'src/app/services/pop.service';

@Component({
  selector: 'app-users-applied',
  templateUrl: './users-applied.component.html',
  styleUrls: ['./users-applied.component.css']
})
export class UsersAppliedComponent implements OnInit {

  jobs : any;

  constructor(private _AppAPI$ : AppApiService, 
              private _PopAPI$ : PopService) { }

  ngOnInit() {
    this._AppAPI$.getUsersAppliedforJobWithCompanyID().subscribe(
      (res) =>{
        console.log(res);
        this.jobs = res.doc;
        this._PopAPI$.showSnack(res.message);
      },
      (err) => {
        this._PopAPI$.showSnack('No Users applied');
      }
    );
  }

  callforInterview(job_id){
    console.log(job_id);
    this._AppAPI$.InviteUsertoInterview(job_id).subscribe(
      (res) => {
        this._PopAPI$.showSnack(res.message)
      },
      (err) =>{
        this._PopAPI$.showSnack(err.message)
      }
    );
  }

}
