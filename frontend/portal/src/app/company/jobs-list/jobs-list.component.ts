import { Component, OnInit } from '@angular/core';
import { AppApiService } from '../../services/app-api.service';
import { PopService } from '../../services/pop.service';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css']
})
export class JobsListComponent implements OnInit {

  jobs : any;

  constructor(private _appAPi$ : AppApiService,
              private _popAPi$ : PopService ) { }

  ngOnInit() {
    this._appAPi$.getJobsByCompany(localStorage.getItem('userId')).subscribe(
      (res) => {
        this.jobs = res.doc;
        console.log("companie's job", this.jobs);
        this._popAPi$.showSnack(res.message);
      },
      (err) =>{
        this._popAPi$.showSnack(err.message);
      }
    )
  }

}
