import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { AppApiService } from '../services/app-api.service';

export interface ICompany {
  name : String,
  phone : String,
  email : String,
  description : String
}

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})

export class CompaniesComponent implements OnInit {

  displayedColumns : string[] = ['name', 'description', 'email', 'phone'];
  dataSource: MatTableDataSource<ICompany>;

  @ViewChild(MatPaginator) paginator : MatPaginator;
  @ViewChild(MatSort) sort : MatSort;

  constructor(private _appAPI$ : AppApiService) { 
    
    this._appAPI$.getCompanies().subscribe(
      (res) => {
        console.log(res.doc);
        this.dataSource = new MatTableDataSource(res.doc);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        console.log(err);
      }
    );

  }

  ngOnInit() {
  }


  applyFilter(filterValue : String) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }

  }

}
