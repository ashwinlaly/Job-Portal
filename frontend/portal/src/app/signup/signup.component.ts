import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { PopService } from '../services/pop.service';
import { AppApiService } from '../services/app-api.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  SignupForm : FormGroup;
  name : FormControl;
  email : FormControl;
  password : FormControl;
  type : FormControl;

  constructor(private _appApi$ : AppApiService, 
              private _dataApi$ : DataService,
              private router : Router, 
              private _popService$ : PopService) { }

  ngOnInit() {
    this.name = new FormControl('',[Validators.required, Validators.minLength(3)]);
    this.email = new FormControl('',[Validators.required]);
    this.password = new FormControl('',[Validators.required]);
    this.type = new FormControl('',[Validators.required]);

    this.SignupForm = new FormGroup({
      name : this.name,
      email : this.email,
      password : this.password,
      type : this.type
    });
  }

  signup() {
    console.log(this.SignupForm.value);
    this._appApi$.Usersignup(this.SignupForm.value).subscribe(
      (res) => {
        if(res.status == 200){
          this._dataApi$.setUserLoggedIn("1");
          this._appApi$.isLoggedIn = true;
          this.router.navigate(['/companies']);
          this._dataApi$.setUserLoggedInId(res.doc._id);
          this._dataApi$.setUserLoggedInType(res.type);
        } else {
          this._popService$.showSnack(res.message);
        }
        console.log(res);
      },
      (err) => this._popService$.showSnack('Invalid Credentials.')
    );
  }

  clear(){
    this.SignupForm.reset();
  }

}
