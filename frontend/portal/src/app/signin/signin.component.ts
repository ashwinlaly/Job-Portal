import { Component, OnInit } from '@angular/core';
import { SigninClass } from '../classes/signin-class';
import { Router } from '@angular/router';

import { AppApiService } from '../services/app-api.service';
import { PopService } from '../services/pop.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  user = new SigninClass('','','1');

  constructor(private _appAPi$  : AppApiService,
              private _popAPI$  : PopService,
              private _dataAPI$ : DataService,
              private routes    : Router) { }

  ngOnInit() {
  }

  clear() {
    this.user = new SigninClass('','','1');
  }

  signin(){
    console.log(this.user);
    this._appAPi$.Usersigin(this.user).subscribe(
      (res) => {
        if(res.status == 200){
          this._dataAPI$.setUserLoggedIn("1");
          this.routes.navigate(['/']);
          localStorage.setItem('userType', res.type);
          localStorage.setItem('userId', res.doc._id);
          console.log(res);
        } else {
          this._popAPI$.showSnack(res.message);
        }
      },
      (err) => this._popAPI$.showSnack('Incorrect Account Data.')
    );
  }

}
