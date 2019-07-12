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
  loggedType: String;
  UserLoggedIn:string;
  CompanyLoggedIn:string;

  constructor(public _dataService$ : DataService,
              private router : Router){
  }

  ngOnInit(){
    this._dataService$.loggedIn.subscribe(val => {
      this.loggedIn = val;
    })
    this._dataService$.loggedType.subscribe(val =>{
      this.loggedType = val;
    });
  }

  logout(){
    this._dataService$.setUserLoggedIn("0");
    this._dataService$.setUserLoggedInType('0');
    this._dataService$.setUserLoggedInId('');
    this.router.navigate(['/']);
    console.log(this.loggedIn);
  }

}
