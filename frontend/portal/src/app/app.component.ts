import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './services/data.service';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Jobs portal';

  loggedIn : String;
  UserLoggedIn:string;
  CompanyLoggedIn:string;

  logger : BehaviorSubject<{logged : String}>;
  private loggerSub : Subscription;

  constructor(public _dataService$ : DataService,
              private router : Router){
    this.logger =  new BehaviorSubject<{logged : String}>({logged : localStorage.getItem('userLoggedIn')});
    this.loggerSub = this.logger.subscribe((e) => {
      console.log("Subr",e);
    });
  }

  ngOnInit(){
    this.loggedIn = this._dataService$.getUserLoggedIn();
    console.log("here",this.loggedIn);
    console.log(this.loggedIn);
  }

  logout(){
    this.loggedIn = "0";
    this.logger =  new BehaviorSubject<{logged : String}>({logged : localStorage.getItem('userLoggedIn')});
    this._dataService$.setUserLoggedIn("0");
    this.router.navigate(['/']);
    console.log(this.loggedIn);
  }

}
