import { Component, OnInit } from '@angular/core';
import { AppApiService } from '../services/app-api.service';
import { PopService } from '../services/pop.service';
import { compileInjectable } from '@angular/compiler';

export interface Ieducation {
  course : String,
  from : Date,
  to : Date,
  percentage : Number
};

export interface Iexperience {
  description : String,
  month : Number,
  year : Number
};

export interface Iaccounts {
  name : String,
  email : String,
  address : String,
  phone : String,
  experience : Iexperience[],
  education : Ieducation[],
};

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  public user : Iaccounts = {
    name : '',
    email : '',
    address: '',
    phone : '',
    experience : [
      {
        description : '',
        month : 0,
        year : 0
      }
    ],
    education : [
      {
        course : '',
        from : new Date,
        to : new Date,
        percentage : 0
      }
    ]
  };

  constructor(private _AppAPI$ : AppApiService,
              private _PopAPI$ : PopService) { }

  ngOnInit() {
    console.log("before",this.user);
    this._AppAPI$.getUserDetailsByID().subscribe(
      (res) => {
        this.user = res.doc;
        console.log("user data",this.user);
      },
      (err) => this._PopAPI$.showSnack(err.message)
    );
  }

  update() {
    console.log(this.user);
    this._AppAPI$.postUserDetailsByID(this.user).subscribe(
      (res) => {
        this._PopAPI$.showSnack(res.message);
      },
      (err) => {
        this._PopAPI$.showSnack(err);
      }
    )
  }

}
