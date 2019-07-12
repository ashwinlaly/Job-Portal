import { Component, OnInit } from '@angular/core';
import { AppApiService } from 'src/app/services/app-api.service';
import { PopService } from 'src/app/services/pop.service';
import { DataService } from 'src/app/services/data.service';

export class CompanyAccount {
  constructor(public name,
              public employee_count,
              public address,
              public email,
              public description,
              public password,
              public phone ){ }
}

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  CompanyId: String;
  company = new CompanyAccount('',0,'','','','','');

  constructor(private _AppAPI$ : AppApiService,
              private _dataService$ : DataService,
              private _PopAPI$: PopService) { }

  ngOnInit() {
    this.CompanyId = this._dataService$.getUserLoggedInId();
    this._AppAPI$.getCompanyDetailsById().subscribe(
      (res) => {
        this.company = res.doc[0];
        console.log(this.company);
      },
      (err) => {
        this._PopAPI$.showSnack('Error in Communication');
      }
    )
  }

  update() {
    console.log(this.company);
    this._AppAPI$.patchCompanyDetails(this.company).subscribe(
      (res) => {
        this._PopAPI$.showSnack(res.message);
      },
      (err) => {
        this._PopAPI$.showSnack("Couldn't update user data");
      }
    )
  }

}
