import { Component, OnInit } from '@angular/core';
import { AppApiService } from '../services/app-api.service';
import { PopService } from '../services/pop.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit {

  data : any;
  loggedin : String;

  constructor(
    private _appApi : AppApiService,
    private _popApi : PopService,
    private _dataService : DataService
  ) { 
    
  }

  ngOnInit() {
    this.loggedin = this._dataService.getUserLoggedIn();

    this._appApi.getAllJobs().subscribe(
      (res) =>{
        this.data = res.doc ;
        console.log(this.data);
        this._popApi.showSnack("Job listed sucessfully.");
      },
      (err) =>{
        this._popApi.showSnack(err.message);
      }
    );
  }

  apply(id,cid){
    if(localStorage.getItem('userType') == '1'){
      var data = {
        job_id : id,
        company_id : cid,
        user_id : localStorage.getItem('userId')
      };
      console.log("Job Applied" ,data);
      this._appApi.applyForJob(data).subscribe(
        (res) => {
          if(res.status == 200 ){
            this._popApi.showSnack(res.message);
            console.log("Job Applied" ,res);
          }
        },
        (err) => {
          this._popApi.showSnack(err.message);
          console.log("Job Applied" ,err);
        }
      )
    } else {
      this._popApi.showSnack('you are unauthorized to apply');
    }
    
  }

}
